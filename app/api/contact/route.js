export async function POST(request) {
  try {
    const body = await request.json();
    // Here, you would typically send an email using a service like Resend or Nodemailer.
    // For demonstration, we simply log the submission.
    console.log("Contact form submission:", body);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      { status: 500 }
    );
  }
} 