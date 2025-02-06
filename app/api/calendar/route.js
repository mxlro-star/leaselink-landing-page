import { Client } from "@microsoft/microsoft-graph-client";
import { getToken } from "../../../lib/auth";

// Helper function to process available slots
function processAvailableSlots(events = []) {
  try {
    // Process events to find available slots
    const busySlots = events.map(event => ({
      start: new Date(event.start.dateTime),
      end: new Date(event.end.dateTime),
    }));

    // Create available slots (9 AM to 5 PM, 30-minute intervals)
    const allSlots = [];
    const current = new Date();
    
    // Add 48 hours to current time for minimum booking window
    current.setHours(current.getHours() + 48);
    
    // Round to nearest future 30-minute slot
    current.setMinutes(Math.ceil(current.getMinutes() / 30) * 30);
    current.setSeconds(0);
    current.setMilliseconds(0);
    
    // If current time is past 5 PM, start from next day at 9 AM
    if (current.getHours() >= 17) {
      current.setDate(current.getDate() + 1);
      current.setHours(9, 0, 0, 0);
    } else if (current.getHours() < 9) {
      current.setHours(9, 0, 0, 0);
    }

    const end = new Date(current);
    end.setDate(end.getDate() + 7); // Look ahead 7 days
    end.setHours(17, 0, 0, 0);

    while (current < end) {
      // Skip weekends
      if (current.getDay() !== 0 && current.getDay() !== 6) {
        const slotStart = new Date(current);
        current.setMinutes(current.getMinutes() + 30);
        const slotEnd = new Date(current);

        // Only add slots during business hours (9 AM - 5 PM)
        if (slotStart.getHours() >= 9 && slotStart.getHours() < 17) {
          const isBooked = busySlots.some(busy => 
            (slotStart >= busy.start && slotStart < busy.end) ||
            (slotEnd > busy.start && slotEnd <= busy.end)
          );

          allSlots.push({
            start: slotStart.toISOString(),
            end: slotEnd.toISOString(),
            isBooked
          });
        }
      }
      // If it's a weekend or after hours, move to next slot
      else {
        current.setDate(current.getDate() + 1);
        current.setHours(9, 0, 0, 0);
      }
    }

    // Calculate how many slots should be booked to reach 60%
    const totalSlots = allSlots.length;
    const currentlyBooked = allSlots.filter(slot => slot.isBooked).length;
    const targetBookedSlots = Math.ceil(totalSlots * 0.6);
    const additionalSlotsNeeded = Math.max(0, targetBookedSlots - currentlyBooked);

    if (additionalSlotsNeeded > 0) {
      // Get array of available slot indices
      const availableIndices = allSlots
        .map((slot, index) => (!slot.isBooked ? index : -1))
        .filter(index => index !== -1);

      // Randomly select slots to mark as booked
      for (let i = 0; i < additionalSlotsNeeded && availableIndices.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * availableIndices.length);
        const slotIndex = availableIndices[randomIndex];
        allSlots[slotIndex].isBooked = true;
        // Remove the used index
        availableIndices.splice(randomIndex, 1);
      }
    }

    // Return only the available slots
    return allSlots
      .filter(slot => !slot.isBooked)
      .map(({ start, end }) => ({ start, end }));

  } catch (error) {
    console.error('Error processing slots:', error);
    throw new Error(`Failed to process available slots: ${error.message}`);
  }
}

export async function GET(req) {
  try {
    console.log('Initializing GET request for calendar slots');
    
    // Initialize Microsoft Graph client
    const client = Client.init({
      authProvider: async (done) => {
        try {
          const token = await getToken();
          done(null, token);
        } catch (error) {
          console.error('Authentication error:', error);
          done(error, null);
        }
      },
    });

    // Get available time slots for next 7 days starting from 48 hours from now
    const startDate = new Date();
    startDate.setHours(startDate.getHours() + 48);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 7);

    console.log(`Fetching calendar view from ${startDate.toISOString()} to ${endDate.toISOString()}`);

    const calendarView = await client
      .api(`/users/team@letora.co.uk/calendar/calendarView`)
      .query({
        startDateTime: startDate.toISOString(),
        endDateTime: endDate.toISOString(),
      })
      .get();

    if (!calendarView || !Array.isArray(calendarView.value)) {
      console.error('Invalid calendar response:', calendarView);
      throw new Error('Invalid calendar response structure');
    }

    console.log(`Retrieved ${calendarView.value.length} calendar events`);

    // Process available slots
    const availableSlots = processAvailableSlots(calendarView.value);
    console.log(`Generated ${availableSlots.length} available slots`);

    return new Response(JSON.stringify({ slots: availableSlots }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Calendar API Error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      statusCode: error.statusCode,
      requestId: error.requestId,
      body: error.body
    });

    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch calendar data',
        details: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          code: error.code,
          statusCode: error.statusCode,
          requestId: error.requestId
        } : undefined
      }), 
      {
        status: error.statusCode || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function POST(req) {
  try {
    console.log('Initializing POST request for booking');
    
    const { dateTime, propertyDetails } = await req.json();
    console.log('Received booking request:', { dateTime, propertyDetails });

    // Validate required fields
    if (!dateTime) {
      throw new Error('Missing dateTime field');
    }
    if (!propertyDetails) {
      throw new Error('Missing propertyDetails field');
    }
    if (!propertyDetails.postcode || !propertyDetails.bedrooms) {
      throw new Error('Missing required property details');
    }

    // Validate dateTime format and range
    const bookingDate = new Date(dateTime);
    if (isNaN(bookingDate.getTime())) {
      throw new Error('Invalid dateTime format');
    }

    const now = new Date();
    if (bookingDate < now) {
      throw new Error('Cannot book appointments in the past');
    }

    // Initialize Microsoft Graph client
    const client = Client.init({
      authProvider: async (done) => {
        try {
          const token = await getToken();
          done(null, token);
        } catch (error) {
          console.error('Authentication error:', error);
          done(error, null);
        }
      },
    });

    // Create calendar event
    const event = {
      subject: 'Property Consultation - LETORA',
      start: {
        dateTime: dateTime,
        timeZone: 'Europe/London',
      },
      end: {
        dateTime: new Date(new Date(dateTime).getTime() + 30 * 60000).toISOString(), // 30 min meeting
        timeZone: 'Europe/London',
      },
      body: {
        contentType: 'HTML',
        content: `
          <p>Property Consultation Details:</p>
          <ul>
            <li>Postcode: ${propertyDetails.postcode}</li>
            <li>Bedrooms: ${propertyDetails.bedrooms}</li>
            <li>Bathrooms: ${propertyDetails.fullBathrooms || '0'}</li>
            <li>Additional Reception Room: ${propertyDetails.hasReceptionRoom === 'yes' ? 'Yes' : 'No'}</li>
            <li>Estimated Value: £${propertyDetails.estimatedValue || 'N/A'} per month</li>
          </ul>
        `
      },
    };

    console.log('Creating calendar event:', event);

    const createdEvent = await client
      .api('/users/team@letora.co.uk/calendar/events')
      .post(event);

    console.log('Successfully created calendar event:', createdEvent.id);

    return new Response(JSON.stringify({ 
      success: true,
      eventId: createdEvent.id
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Calendar Booking Error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      statusCode: error.statusCode,
      requestId: error.requestId,
      body: error.body
    });

    // Determine appropriate status code
    let statusCode = 500;
    if (error.message.includes('Missing')) {
      statusCode = 400;
    } else if (error.statusCode) {
      statusCode = error.statusCode;
    }

    return new Response(
      JSON.stringify({ 
        error: 'Failed to book appointment',
        details: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          code: error.code,
          statusCode: error.statusCode,
          requestId: error.requestId
        } : undefined
      }), 
      {
        status: statusCode,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
} 