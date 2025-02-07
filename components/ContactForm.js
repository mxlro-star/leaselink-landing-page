"use client";
import { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import confetti from 'canvas-confetti';

const PropertyGame = dynamic(() => import('./PropertyGame'), {
  ssr: false,
  loading: () => <div className="animate-pulse">Loading game...</div>
});

// Update the form input and button classes to use trust colors
const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust transition-colors";
const buttonClasses = "w-full bg-trust hover:bg-trust-light text-white font-semibold p-4 rounded-lg transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-trust focus:ring-offset-2 shadow-lg";

// Add email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Add phone number validation function after email validation
const isValidUKPhone = (phone) => {
  const ukPhoneRegex = /^(?:(?:\+44)|(?:0))(?:(?:(?:1\d{8,9})|(?:7[0-9]\d{8})|(?:2[0-9]\d{7,8})|(?:3[0-9]\d{7,8})|(?:4[0-9]\d{7,8})|(?:5[0-9]\d{7,8})|(?:8[0-9]\d{7,8})|(?:9[0-9]\d{7,8})))$/;
  return ukPhoneRegex.test(phone.replace(/\s+/g, ''));
};

export default function ContactForm() {
  const [gameStep, setGameStep] = useState('form');
  const [formData, setFormData] = useState({ 
    postcode: '', 
    bedrooms: '',
    fullBathrooms: '0',
    hasReceptionRoom: 'no'
  });
  const [formErrors, setFormErrors] = useState({});
  const [email, setEmail] = useState('');
  const [postcodes, setPostcodes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [calculatedAmount, setCalculatedAmount] = useState(null);
  const [bookingEmail, setBookingEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [allTimeSlots, setAllTimeSlots] = useState([]);

  // Add useRef for the contact form section
  const contactFormRef = useRef(null);

  // Load postcodes data
  useEffect(() => {
    async function loadPostcodes() {
      try {
        const response = await fetch('/postcodes-latest-wmca.json');
        const data = await response.json();
        setPostcodes(data);
      } catch (error) {
        console.error('Error loading postcodes:', error);
      }
    }
    loadPostcodes();
  }, []);

  // Add useEffect for scroll restoration
  useEffect(() => {
    // Check if the URL hash is #contact
    if (window.location.hash === '#contact' && contactFormRef.current) {
      // Scroll to contact form with offset
      const yOffset = window.innerWidth < 640 ? -20 : -50;
      const element = contactFormRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }, []);

  const isValidBirminghamPostcode = (postcode) => {
    if (!postcodes) return false;
    
    // Clean the postcode
    const cleanPostcode = postcode.toUpperCase().replace(/\s/g, '');
    
    // Check if the postcode exists in our data
    return postcodes.some(p => p.postcode.replace(/\s/g, '') === cleanPostcode);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.postcode) {
      errors.postcode = 'Postcode is required';
    }
    
    const bedrooms = parseInt(formData.bedrooms);
    if (!formData.bedrooms || isNaN(bedrooms) || bedrooms < 1) {
      errors.bedrooms = 'Must have at least 1 bedroom';
    }

    const fullBathrooms = parseInt(formData.fullBathrooms);
    if (formData.fullBathrooms === '' || isNaN(fullBathrooms) || fullBathrooms < 1) {
      errors.fullBathrooms = 'Must have at least 1 bathroom';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCalculateValue = () => {
    if (!validateForm()) {
      return;
    }

    // First scroll to the form to ensure loading state is visible
    if (contactFormRef.current) {
      const yOffset = window.innerWidth < 640 ? -20 : -50;
      const element = contactFormRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }

    // Short delay to ensure scroll is complete before showing loading state
    setTimeout(() => {
      setGameStep('loading');
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        const isValidPostcode = isValidBirminghamPostcode(formData.postcode);
        
        if (isValidPostcode) {
          const amount = parseInt(formData.bedrooms) === 1 
            ? 605
            : Math.floor((86.471 * formData.bedrooms * 4) / 5) * 5;
          setCalculatedAmount(amount);
          setGameStep('success');
          
          // Create confetti
          const end = Date.now() + 4000;
          const colors = ['#10B981', '#3B82F6', '#6366F1'];
          
          (function frame() {
            confetti({
              particleCount: 3,
              angle: 60,
              spread: 55,
              origin: { x: 0, y: 0.6 },
              colors: colors
            });
            
            confetti({
              particleCount: 3,
              angle: 120,
              spread: 55,
              origin: { x: 1, y: 0.6 },
              colors: colors
            });

            if (Date.now() < end) {
              requestAnimationFrame(frame);
            }
          }());
        } else {
          setGameStep('outside');
        }
        setIsLoading(false);
      }, 3000);
    }, 100);
  };

  const fetchAvailableSlots = async () => {
    try {
      setIsLoadingSlots(true);
      const response = await fetch('/api/calendar');
      if (!response.ok) {
        throw new Error('Failed to fetch available slots');
      }
      const data = await response.json();
      if (!data.slots || !Array.isArray(data.slots)) {
        throw new Error('Invalid slots data received');
      }

      // Get all slots for the next 7 days
      const current = new Date();
      current.setHours(current.getHours() + 48); // Start 48 hours from now
      const end = new Date(current);
      end.setDate(end.getDate() + 7);

      // Generate all possible slots
      const allSlots = [];
      const tempDate = new Date(current);
      
      while (tempDate < end) {
        // Skip weekends
        if (tempDate.getDay() !== 0 && tempDate.getDay() !== 6) {
          if (tempDate.getHours() >= 9 && tempDate.getHours() < 17) {
            const slotStart = new Date(tempDate);
            const slotEnd = new Date(tempDate);
            slotEnd.setMinutes(slotEnd.getMinutes() + 30);

            // Check if this slot is in the available slots from API
            const isAvailable = data.slots.some(
              slot => new Date(slot.start).getTime() === slotStart.getTime()
            );

            allSlots.push({
              start: slotStart.toISOString(),
              end: slotEnd.toISOString(),
              isAvailable
            });
          }
        }
        tempDate.setMinutes(tempDate.getMinutes() + 30);
        
        // If we've passed 5 PM, move to next day at 9 AM
        if (tempDate.getHours() >= 17) {
          tempDate.setDate(tempDate.getDate() + 1);
          tempDate.setHours(9, 0, 0, 0);
        }
      }

      setAllTimeSlots(allSlots);
      setAvailableSlots(data.slots);

      // Scroll to the contact form section with offset
      if (contactFormRef.current) {
        const yOffset = -50; // 50px offset from the top
        const element = contactFormRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      setBookingError('Failed to load available slots. Please try again.');
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleBookConsultation = async () => {
    try {
      // Ensure viewport stays focused on contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      setIsLoading(true);
      setBookingError(null);
      setGameStep('booking');

      // Validate email
      if (!isValidEmail(bookingEmail)) {
        setEmailError('Please enter a valid email address');
        setIsLoading(false);
        setGameStep('calendar');
        return;
      }

      // Validate phone
      if (!isValidUKPhone(bookingPhone)) {
        setPhoneError('Please enter a valid UK phone number');
        setIsLoading(false);
        setGameStep('calendar');
        return;
      }

      try {
        // Book the consultation
        const response = await fetch('/api/calendar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dateTime: selectedSlot,
            propertyDetails: {
              postcode: formData.postcode,
              bedrooms: formData.bedrooms,
              fullBathrooms: formData.fullBathrooms,
              hasReceptionRoom: formData.hasReceptionRoom,
              estimatedValue: calculatedAmount
            }
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to book consultation');
        }

        // Send confirmation email
        const emailResponse = await fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: bookingEmail,
            bookingDateTime: selectedSlot
          }),
        });

        if (!emailResponse.ok) {
          console.error('Failed to send confirmation email');
        }

        setGameStep('booked');
        window.confetti?.();

        // Ensure viewport is still focused on contact section after success
        setTimeout(() => {
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      } catch (error) {
        console.error('Error booking consultation:', error);
        setBookingError('Failed to book consultation. Please try again.');
        setGameStep('calendar');
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error in handleBookConsultation:', error);
      setBookingError('An unexpected error occurred. Please try again.');
      setGameStep('calendar');
      setIsLoading(false);
    }
  };

  const renderGameContent = () => {
    switch (gameStep) {
      case 'form':
  return (
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-6">
              {/* Postcode Field with Autofocus */}
              <div className="transform transition-all duration-300">
                <label className="block text-blue-100 mb-2 text-lg font-medium">Where is your property located?</label>
                <div className="relative">
                <input
                  type="text"
                    value={formData.postcode}
                    onChange={(e) => {
                      const val = e.target.value.toUpperCase();
                      setFormData(prev => ({ ...prev, postcode: val }));
                      setFormErrors(prev => ({ ...prev, postcode: '' }));
                    }}
                    className={`
                      w-full px-4 py-3 sm:py-4 rounded-lg bg-white/10 border text-base sm:text-lg
                      ${formErrors.postcode ? 'border-red-500' : 'border-white/20'}
                      text-white placeholder-white/50 focus:outline-none focus:border-blue-400
                      transition-all duration-300
                    `}
                    placeholder="Enter postcode (e.g., B1 1AA)"
                    autoFocus
                  />
                  {formData.postcode && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                {formErrors.postcode && (
                  <p className="mt-2 text-sm text-red-400 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formErrors.postcode}
                  </p>
                )}
              </div>

              {/* Bedrooms Field with Visual Selector */}
              <div className="transform transition-all duration-300">
                <label className="block text-blue-100 mb-2 text-lg font-medium">How many bedrooms?</label>
                <div className="space-y-3">
                  {/* Quick Select Buttons */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1 sm:gap-2">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, bedrooms: num.toString() }));
                          setFormErrors(prev => ({ ...prev, bedrooms: '' }));
                        }}
                        className={`
                          py-3 sm:py-4 rounded-lg border transition-all duration-300 relative overflow-hidden
                          ${formData.bedrooms === num.toString() 
                            ? 'bg-emerald-500 border-emerald-400 text-white' 
                            : 'bg-white/10 border-white/20 text-white hover:border-white/40'}
                        `}
                      >
                        <span className="relative z-10">{num}</span>
                        {formData.bedrooms === num.toString() && (
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-white/25 to-emerald-500/0 animate-shine" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Custom Input for Larger Numbers */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        const currentBedrooms = parseInt(formData.bedrooms) || 0;
                        if (currentBedrooms > 5) {
                          setFormData(prev => ({ ...prev, bedrooms: '5' }));
                        } else {
                          setFormData(prev => ({ ...prev, bedrooms: '6' }));
                        }
                        setFormErrors(prev => ({ ...prev, bedrooms: '' }));
                      }}
                      className={`
                        w-full py-4 px-4 rounded-lg border transition-all duration-300 relative overflow-hidden text-left
                        ${parseInt(formData.bedrooms) > 5
                          ? 'bg-emerald-500 border-emerald-400 text-white'
                          : 'bg-white/10 border-white/20 text-white hover:border-white/40'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          More than 5 bedrooms
                        </span>
                        {parseInt(formData.bedrooms) > 5 && (
                          <span className="bg-emerald-600 px-2 py-1 rounded text-sm">
                            {formData.bedrooms} rooms
                          </span>
                        )}
                      </div>
                    </button>

                    {/* Custom Number Input */}
                    {parseInt(formData.bedrooms) > 5 && (
                      <div className="mt-2 flex items-center gap-2">
                <input
                          type="number"
                          value={formData.bedrooms}
                          onChange={(e) => {
                            const value = Math.max(6, Math.min(50, parseInt(e.target.value) || 6));
                            setFormData(prev => ({ ...prev, bedrooms: value.toString() }));
                            setFormErrors(prev => ({ ...prev, bedrooms: '' }));
                          }}
                          min="6"
                          max="50"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-emerald-400/50 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400"
                        />
                        <div className="flex flex-col gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              const current = parseInt(formData.bedrooms) || 6;
                              setFormData(prev => ({ 
                                ...prev, 
                                bedrooms: Math.min(50, current + 1).toString()
                              }));
                            }}
                            className="p-1 rounded bg-white/10 hover:bg-white/20 text-white"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const current = parseInt(formData.bedrooms) || 6;
                              setFormData(prev => ({ 
                                ...prev, 
                                bedrooms: Math.max(6, current - 1).toString()
                              }));
                            }}
                            className="p-1 rounded bg-white/10 hover:bg-white/20 text-white"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {formErrors.bedrooms && (
                  <p className="mt-2 text-sm text-red-400 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formErrors.bedrooms}
                  </p>
                )}
              </div>

              {/* Bathrooms Field with Visual Selector */}
              <div className="transform transition-all duration-300">
                <label className="block text-blue-100 mb-2 text-lg font-medium">How many bathrooms?</label>
                <div className="space-y-3">
                  {/* Quick Select Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, fullBathrooms: num.toString() }));
                          setFormErrors(prev => ({ ...prev, fullBathrooms: '' }));
                        }}
                        className={`
                          py-4 rounded-lg border transition-all duration-300 relative overflow-hidden
                          ${formData.fullBathrooms === num.toString() 
                            ? 'bg-emerald-500 border-emerald-400 text-white' 
                            : 'bg-white/10 border-white/20 text-white hover:border-white/40'}
                        `}
                      >
                        <span className="relative z-10">{num}</span>
                        {formData.fullBathrooms === num.toString() && (
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-white/25 to-emerald-500/0 animate-shine" />
                        )}
                      </button>
                    ))}
            </div>
            
                  {/* Custom Input for Larger Numbers */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        const currentBathrooms = parseInt(formData.fullBathrooms) || 0;
                        if (currentBathrooms > 4) {
                          setFormData(prev => ({ ...prev, fullBathrooms: '4' }));
                        } else {
                          setFormData(prev => ({ ...prev, fullBathrooms: '5' }));
                        }
                        setFormErrors(prev => ({ ...prev, fullBathrooms: '' }));
                      }}
                      className={`
                        w-full py-4 px-4 rounded-lg border transition-all duration-300 relative overflow-hidden text-left
                        ${parseInt(formData.fullBathrooms) > 4
                          ? 'bg-emerald-500 border-emerald-400 text-white'
                          : 'bg-white/10 border-white/20 text-white hover:border-white/40'}
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          More than 4 bathrooms
                        </span>
                        {parseInt(formData.fullBathrooms) > 4 && (
                          <span className="bg-emerald-600 px-2 py-1 rounded text-sm">
                            {formData.fullBathrooms} rooms
                          </span>
                        )}
                      </div>
                    </button>

                    {/* Custom Number Input */}
                    {parseInt(formData.fullBathrooms) > 4 && (
                      <div className="mt-2 flex items-center gap-2">
                <input
                          type="number"
                          value={formData.fullBathrooms}
                          onChange={(e) => {
                            const value = Math.max(5, Math.min(20, parseInt(e.target.value) || 5));
                            setFormData(prev => ({ ...prev, fullBathrooms: value.toString() }));
                            setFormErrors(prev => ({ ...prev, fullBathrooms: '' }));
                          }}
                          min="5"
                          max="20"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-emerald-400/50 text-white placeholder-white/50 focus:outline-none focus:border-emerald-400"
                        />
                        <div className="flex flex-col gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              const current = parseInt(formData.fullBathrooms) || 5;
                              setFormData(prev => ({ 
                                ...prev, 
                                fullBathrooms: Math.min(20, current + 1).toString()
                              }));
                            }}
                            className="p-1 rounded bg-white/10 hover:bg-white/20 text-white"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const current = parseInt(formData.fullBathrooms) || 5;
                              setFormData(prev => ({ 
                                ...prev, 
                                fullBathrooms: Math.max(5, current - 1).toString()
                              }));
                            }}
                            className="p-1 rounded bg-white/10 hover:bg-white/20 text-white"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {formErrors.fullBathrooms && (
                  <p className="mt-2 text-sm text-red-400 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formErrors.fullBathrooms}
                  </p>
                )}
              </div>

              {/* Reception Room Toggle with Enhanced UI */}
              <div className="transform transition-all duration-300">
                <label className="block text-blue-100 mb-4 text-lg font-medium">Does the property have an additional reception room?</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, hasReceptionRoom: 'yes' }))}
                    className={`
                      flex-1 px-6 py-4 rounded-lg border group relative overflow-hidden
                      ${formData.hasReceptionRoom === 'yes'
                        ? 'bg-emerald-500 border-emerald-400 text-white'
                        : 'bg-white/10 border-white/20 text-white hover:border-white/40'}
                      transition-all duration-300
                    `}
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      <svg className={`w-5 h-5 ${formData.hasReceptionRoom === 'yes' ? 'text-white' : 'text-emerald-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Yes
                    </div>
                    {formData.hasReceptionRoom === 'yes' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-white/25 to-emerald-500/0 animate-shine" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, hasReceptionRoom: 'no' }))}
                    className={`
                      flex-1 px-6 py-4 rounded-lg border group relative overflow-hidden
                      ${formData.hasReceptionRoom === 'no'
                        ? 'bg-emerald-500 border-emerald-400 text-white'
                        : 'bg-white/10 border-white/20 text-white hover:border-white/40'}
                      transition-all duration-300
                    `}
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      <svg className={`w-5 h-5 ${formData.hasReceptionRoom === 'no' ? 'text-white' : 'text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      No
                    </div>
                    {formData.hasReceptionRoom === 'no' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-white/25 to-emerald-500/0 animate-shine" />
                    )}
                  </button>
                </div>
              </div>

              {/* Calculate Button with Enhanced Animation */}
              <button
                onClick={handleCalculateValue}
                disabled={isLoading || !postcodes}
                className={`
                  w-full px-6 py-4 rounded-lg font-semibold text-lg
                  relative overflow-hidden group
                  ${(isLoading || !postcodes) 
                    ? 'opacity-50 cursor-not-allowed bg-gray-500' 
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'}
                  transition-all duration-300 transform hover:scale-[1.02]
                  shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30
                `}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : !postcodes ? (
                    'Loading Postcodes...'
                  ) : (
                    <>
                      <span>Calculate Your Value</span>
                      <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
              </button>
            </div>
          </div>
        );

      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center min-h-[400px] py-8">
            <div className="w-full max-w-sm mx-auto mb-8">
              <PropertyGame />
            </div>
            <p className="text-blue-100 text-lg mb-4">Collecting property data...</p>
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-6">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">Great news!</h3>
              <p className="text-lg text-blue-100">
                Based on your property details, we can gurantee you:
              </p>
              <div className="relative mt-2 mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 blur-xl opacity-30 animate-pulse-slow"></div>
                <span className="relative block text-4xl font-bold bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent">
                  £{calculatedAmount} per month
                </span>
              </div>
            </div>

            {formData.hasReceptionRoom === 'yes' && (
              <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-400/20 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-emerald-300 mb-3">
                  Increase Your Rental Income!
                </h4>
                <p className="text-blue-100 mb-3">
                  By converting your additional reception room into a bedroom, you could increase your guaranteed rent by up to £350 per month.
                </p>
                <p className="text-sm text-blue-200/80">
                  We can manage the entire conversion process for you. Book a consultation to discuss this opportunity.
                </p>
              </div>
            )}

            <div className="space-y-4">
            <button
                onClick={() => {
                  setGameStep('calendar');
                  fetchAvailableSlots();
                }}
                className="w-full px-6 py-4 rounded-lg font-semibold text-lg relative overflow-hidden group bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book Your Consultation
                  <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
              </button>

              <button
                onClick={() => {
                  setFormData({ postcode: '', bedrooms: '', fullBathrooms: '0', hasReceptionRoom: 'no' });
                  setGameStep('form');
                }}
                className="w-full px-6 py-4 rounded-lg font-medium text-blue-200 border border-blue-200/20 hover:bg-blue-500/10 transition-all duration-300"
              >
                Try Another Property
              </button>
            </div>
          </div>
        );

      case 'outside':
        return (
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-blue-200">Special Quote Required</h3>
            <p className="text-blue-100">Your property is outside our instant quote area, but we'd love to help!</p>
            <div className="max-w-sm mx-auto space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
                placeholder="Enter your email"
              />
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    if (!email) {
                      alert('Please enter your email');
                      return;
                    }
                    alert('Thank you! We will send your quote within 48 hours.');
                  }}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Get Your Quote
                    <svg className="w-4 h-4 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
                <button
                  onClick={() => {
                    setFormData({ postcode: '', bedrooms: '', fullBathrooms: '0', hasReceptionRoom: 'no' });
                    setEmail('');
                    setGameStep('form');
                  }}
                  className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/5 text-blue-200 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <svg className="w-4 h-4 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Go Back
                </button>
              </div>
            </div>
          </div>
        );

      case 'calendar':
        return (
          <div className="text-center space-y-6">
            <h3 className="text-3xl font-bold text-white mb-6">Book Your Consultation</h3>
            {isLoadingSlots ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin"></div>
                <p className="text-blue-100">Loading available slots...</p>
              </div>
            ) : bookingError ? (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 mb-4">
                {bookingError}
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-lg text-blue-100 mb-4">Select a time that works for you:</p>
                  <div className="grid gap-2 max-h-[calc(100vh-20rem)] sm:max-h-[24rem] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent">
                    {allTimeSlots.map((slot) => {
                      const date = new Date(slot.start);
                      const isSelected = selectedSlot === slot.start;
                      
                      return (
                        <button
                          key={slot.start}
                          onClick={() => slot.isAvailable && setSelectedSlot(slot.start)}
                          disabled={!slot.isAvailable}
                          className={`
                            relative p-2 sm:p-3 rounded-xl transition-all duration-300 group min-h-[4rem]
                            ${isSelected
                              ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border-emerald-400/50 text-white scale-[1.02] shadow-lg shadow-emerald-500/20'
                              : slot.isAvailable
                                ? 'bg-gradient-to-r from-white/5 to-blue-500/5 border-blue-200/20 text-blue-100 hover:border-blue-400/30 hover:scale-[1.02]'
                                : 'bg-gradient-to-r from-red-500/5 to-red-600/5 border-red-200/20 text-red-100 cursor-not-allowed'}
                            border backdrop-blur-sm overflow-hidden
                          `}
                        >
                          <div className="relative z-10">
                            {/* Date and Time Display */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 sm:mb-2">
                              <span className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                                <svg className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                  isSelected ? 'text-emerald-400' : 
                                  slot.isAvailable ? 'text-blue-400' : 'text-red-400'
                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="font-medium">
                                  {date.toLocaleDateString('en-GB', {
                                    weekday: 'short',
                                    day: 'numeric',
                                    month: 'short',
                                  })}
                                </span>
                              </span>
                            </div>
                            
                            {/* Time and Status */}
                            <div className="flex items-center justify-between">
                              <span className={`text-base sm:text-xl font-semibold ${
                                isSelected ? 'text-emerald-200' : 
                                slot.isAvailable ? 'text-blue-200' : 'text-red-200'
                              }`}>
                                {date.toLocaleTimeString('en-GB', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                                isSelected ? 'bg-emerald-500/30 text-emerald-200' :
                                slot.isAvailable ? 'bg-blue-500/20 text-blue-200' : 'bg-red-500/20 text-red-200'
                              }`}>
                                {slot.isAvailable ? 'Available' : 'Taken'}
                              </span>
                            </div>
                          </div>
                          
                          {/* Hover Effect */}
                          {slot.isAvailable && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-blue-100 text-left mb-2 text-lg">Your Email Address</label>
                    <input
                      type="email"
                      value={bookingEmail}
                      onChange={(e) => {
                        setBookingEmail(e.target.value);
                        setEmailError('');
                      }}
                      className={`
                        w-full px-4 py-3 rounded-lg bg-white/10 border text-white text-base
                        ${emailError ? 'border-red-500' : 'border-white/20'}
                        placeholder-white/50 focus:outline-none focus:border-emerald-400
                        transition-all duration-300
                      `}
                      placeholder="Enter your email address"
                    />
                    {emailError && (
                      <p className="text-red-400 text-sm mt-2 text-left flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {emailError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-blue-100 text-left mb-2 text-lg">Your Phone Number</label>
                    <input
                      type="tel"
                      value={bookingPhone}
                      onChange={(e) => {
                        setBookingPhone(e.target.value);
                        setPhoneError('');
                      }}
                      className={`
                        w-full px-4 py-3 rounded-lg bg-white/10 border text-white text-base
                        ${phoneError ? 'border-red-500' : 'border-white/20'}
                        placeholder-white/50 focus:outline-none focus:border-emerald-400
                        transition-all duration-300
                      `}
                      placeholder="Enter your UK phone number"
                    />
                    {phoneError && (
                      <p className="text-red-400 text-sm mt-2 text-left flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {phoneError}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleBookConsultation}
                    disabled={!selectedSlot}
                    className={`
                      w-full px-6 py-4 rounded-lg font-semibold text-lg relative overflow-hidden group
                      ${!selectedSlot
                        ? 'bg-gray-500/50 text-white/50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700'}
                      transition-all duration-300 transform hover:scale-[1.02]
                      shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30
                    `}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Confirm Booking
                      {selectedSlot && (
                        <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      )}
                    </span>
                    {selectedSlot && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shine" />
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setGameStep('success');
                      setSelectedSlot(null);
                      setAvailableSlots([]);
                    }}
                    className="w-full px-6 py-4 rounded-lg font-medium text-blue-200 border border-blue-200/20 hover:bg-blue-500/10 transition-all duration-300"
                  >
                    Go Back
                  </button>
                </div>
              </>
            )}
          </div>
        );

      case 'booking':
        return (
          <div className="text-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 blur-xl opacity-20 animate-pulse-slow"></div>
              <div className="relative">
                {/* Loading Animation */}
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-blue-200/30 border-t-emerald-400 animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-10 h-10 text-emerald-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">Confirming Your Consultation</h3>
                <p className="text-lg text-blue-100">Please wait while we schedule your appointment...</p>
              </div>
            </div>
          </div>
        );

      case 'booked':
        const bookedDate = new Date(selectedSlot);
        const formattedDate = bookedDate.toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
        const formattedTime = bookedDate.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit'
        });

        return (
          <div className="text-center space-y-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 blur-xl opacity-20 animate-pulse-slow"></div>
              <div className="relative">
                {/* Success Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 flex items-center justify-center">
                      <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/50 to-emerald-600/50 rounded-full blur animate-pulse-slow"></div>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-white mb-2">Your Consultation is Confirmed!</h3>
                <div className="mb-8">
                  <p className="text-2xl text-emerald-300 font-semibold">{formattedDate}</p>
                  <p className="text-xl text-emerald-200">{formattedTime}</p>
                </div>

                <div className="max-w-lg mx-auto space-y-6">
                  <p className="text-lg text-blue-100">
                    Relax you don't need to do anything else. We'll call you at the scheduled time to discuss maximizing your property's potential.
                  </p>

                  <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-400/20 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold text-blue-200 mb-4">What happens next?</h4>
                    <ul className="space-y-4 text-left">
                      <li className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-blue-100">We've sent a calendar invitation to your email</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-blue-100">Our property expert will call you on the number provided</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-blue-100">Just answer your phone at the scheduled time - we'll handle everything else!</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-400/20">
                    <p className="text-emerald-200 text-sm">
                      Need to reschedule? No problem! Just click the link in your confirmation email.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section 
      id="contact" 
      ref={contactFormRef}
      className="relative min-h-screen py-4 sm:py-6 overflow-hidden bg-gradient-to-br from-[#1a365d] via-[#0A1930] to-[#1a365d] flex items-center"
    >
      {/* Dynamic Particles Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1930]/80 via-[#1E3A8A]/20 to-[#0A1930]/80" />
        {/* Enhanced animated grid with floating elements */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-24 h-24 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-xl animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative container mx-auto px-4 z-10 w-full">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Form Container */}
          <div className="relative">
            {/* Animated Border */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition animate-gradient-xy" />
            
            <div className="relative p-3 sm:p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-blue-500/[0.05] backdrop-blur-sm border border-white/10 shadow-2xl">
              {renderGameContent()}
            </div>
          </div>

          {/* WhatsApp Support */}
          <div className="mt-3 sm:mt-4 text-center">
            <a
              href="https://wa.me/447947764486"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group relative inline-flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl w-full sm:w-auto
                bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700
                text-white font-medium transition-all duration-300
                shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-95 sm:hover:-translate-y-0.5
              `}
            >
              <div className="relative flex items-center gap-2 sm:gap-3 w-full justify-center sm:justify-start">
                <div className="relative flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6">
                  <img 
                    src="/whatsapp.png" 
                    alt="WhatsApp" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="flex flex-col items-start text-left">
                  <span className="text-xs sm:text-sm text-emerald-100">
                    {gameStep === 'booked' 
                      ? 'Questions about your consultation?' 
                      : gameStep === 'calendar' 
                        ? 'Need help with booking?' 
                        : 'Need assistance?'}
                  </span>
                  <span className="font-semibold text-sm sm:text-base">Chat with us</span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
          background-size: 400% 400%;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%) skew(-15deg); }
          100% { transform: translateX(200%) skew(-15deg); }
        }
        .animate-shine {
          animation: shine 1.5s ease-in-out infinite;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.2);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </section>
  );
} 