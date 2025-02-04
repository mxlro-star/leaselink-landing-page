"use client";
import { useState } from "react";

// Update the form input and button classes to use trust colors
const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-trust focus:border-trust transition-colors";
const buttonClasses = "w-full bg-trust hover:bg-trust-light text-white font-semibold p-4 rounded-lg transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-trust focus:ring-offset-2 shadow-lg";

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyLocation: "",
    propertyType: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({
          fullName: "",
          email: "",
          phone: "",
          propertyLocation: "",
          propertyType: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-16 bg-gradient-to-b from-gray-50 to-white animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto card-neumorphic rounded-xl p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">
            Get Your Free Consultation
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Fill out the form below and we'll get back to you within 24 hours
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className={inputClasses}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+44 123 456 7890"
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Location</label>
                <input
                  type="text"
                  name="propertyLocation"
                  value={form.propertyLocation}
                  onChange={handleChange}
                  placeholder="City, Postcode"
                  required
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select
                name="propertyType"
                value={form.propertyType}
                onChange={handleChange}
                required
                className={inputClasses}
              >
                <option value="">Select Property Type</option>
                <option value="HMO">HMO</option>
                <option value="Self-Contained">Self-Contained</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us more about your property..."
                className={`${inputClasses} h-32`}
              ></textarea>
            </div>

            <button
              type="submit"
              className={buttonClasses}
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Get Your Free Consultation"
              )}
            </button>

            {status === "success" && (
              <div className="text-center p-4 bg-green-50 text-green-600 rounded-lg">
                Success! We will contact you shortly.
              </div>
            )}
            {status === "error" && (
              <div className="text-center p-4 bg-red-50 text-red-600 rounded-lg">
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
} 