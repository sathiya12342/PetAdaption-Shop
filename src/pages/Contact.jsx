import React, { useState } from "react";
import { Mail, User, MessageSquare, FileText } from "lucide-react";

const initialValues = { name: "", email: "", subject: "", message: "" };

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required";
  if (!values.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Enter a valid email";
  if (!values.subject.trim()) errors.subject = "Subject is required";
  if (!values.message.trim()) errors.message = "Message is required";
  else if (values.message.length < 10)
    errors.message = "Message should be at least 10 characters";
  return errors;
};

const Contact = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ sending: false, success: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    try {
      setStatus({ sending: true, success: false });
      await new Promise((res) => setTimeout(res, 800));
      setStatus({ sending: false, success: true });
      setValues(initialValues);
    } catch {
      setStatus({ sending: false, success: false });
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 px-4 py-12">
      <div className="max-w-6xl w-full grid lg:grid-cols-3 gap-8">
        {/* Left Side Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">Reach Us</h2>
            <p className="text-gray-600 mb-4">
              Our support team typically replies within 24 hours 🚀
            </p>
            <div className="space-y-3 text-gray-700">
              <p><span className="font-medium">📧 Email:</span> support@p-shop.com</p>
              <p><span className="font-medium">📞 Phone:</span> +91 98765 43210</p>
              <p><span className="font-medium">🕒 Hours:</span> Mon–Sat, 9am–6pm</p>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              title="PSHOP Location"
              src="https://www.google.com/maps?q=Chennai&output=embed"
              className="w-full h-60 border-0"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right Side Form */}
        <div className="lg:col-span-2">
          {status.success && (
            <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-700 font-medium shadow">
              ✅ Thank you! Your message has been sent.
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-200"
          >
            {/* Name */}
            <div className="mb-5 relative">
              <User className="absolute top-3 left-3 text-gray-400" />
              <input
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={`w-full pl-10 rounded-xl border p-3 outline-none focus:ring-2 transition ${
                  errors.name
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-red-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-5 relative">
              <Mail className="absolute top-3 left-3 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full pl-10 rounded-xl border p-3 outline-none focus:ring-2 transition ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-red-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Subject */}
            <div className="mb-5 relative">
              <FileText className="absolute top-3 left-3 text-gray-400" />
              <input
                id="subject"
                name="subject"
                value={values.subject}
                onChange={handleChange}
                placeholder="Subject"
                className={`w-full pl-10 rounded-xl border p-3 outline-none focus:ring-2 transition ${
                  errors.subject
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-red-300"
                }`}
              />
              {errors.subject && (
                <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
              )}
            </div>

            {/* Message */}
            <div className="mb-5 relative">
              <MessageSquare className="absolute top-3 left-3 text-gray-400" />
              <textarea
                id="message"
                name="message"
                rows="5"
                value={values.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className={`w-full pl-10 rounded-xl border p-3 outline-none focus:ring-2 transition resize-none ${
                  errors.message
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-red-300"
                }`}
              />
              {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={status.sending}
              className="w-full rounded-xl bg-red-600 text-white py-3 font-semibold shadow-lg hover:bg-red-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-40">
              {status.sending ? "🚀 Sending..." : "✉️ Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
