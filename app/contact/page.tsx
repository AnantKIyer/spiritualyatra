"use client";

import { useState, useId } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ContactFormData } from "@/types";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { toPackages } from "@/lib/convex/map";

export default function ContactPage() {
  const packageSelectId = useId();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const packageDocs = useQuery(api.packages.list);
  const submitInquiry = useMutation(api.contactInquiries.submit);
  const packages = packageDocs ? toPackages(packageDocs) : [];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    try {
      await submitInquiry({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        packageSlug: data.package || undefined,
      });
      setIsSubmitted(true);
      reset();
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1760px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold text-airbnb-black mb-4">
              Contact us
            </h1>
            <p className="text-lg text-airbnb-gray">
              Have questions or ready to plan your spiritual journey? We&apos;re
              here to help.
            </p>
          </div>

          {isSubmitted && (
            <div
              className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800"
              role="status"
            >
              Thank you for your message! We will get back to you soon.
            </div>
          )}

          {submitError && (
            <div
              className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800"
              role="alert"
            >
              {submitError}
            </div>
          )}

          <div className="bg-white border border-orange-100 rounded-xl p-8 md:p-10 mb-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  error={errors.name?.message}
                />
                <Input
                  label="Email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={errors.email?.message}
                />
              </div>

              <div>
                <Input
                  label="Phone number"
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  error={errors.phone?.message}
                />
              </div>

              <div>
                <label
                  htmlFor={packageSelectId}
                  className="block text-sm font-medium text-airbnb-black mb-2"
                >
                  Interested package (optional)
                </label>
                <select
                  id={packageSelectId}
                  {...register("package")}
                  disabled={packageDocs === undefined}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 bg-white transition-all duration-200 border-orange-100 disabled:opacity-50"
                >
                  <option value="">Select a package (optional)</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Textarea
                  label="Message"
                  {...register("message", {
                    required: "Message is required",
                  })}
                  error={errors.message?.message}
                  placeholder="Tell us about your spiritual journey interests, questions, or how we can help you..."
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full md:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending…" : "Send message"}
                </Button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-red-50 rounded-xl border border-red-100">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-airbnb-black mb-2">Email</h3>
              <p className="text-sm text-airbnb-gray">
                info@spiritualyatra.com
              </p>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-100">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-airbnb-black mb-2">Phone</h3>
              <p className="text-sm text-airbnb-gray">+91 123 456 7890</p>
            </div>

            <div className="text-center p-6 bg-yellow-50 rounded-xl border border-yellow-100">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-airbnb-black mb-2">Address</h3>
              <p className="text-sm text-airbnb-gray">New Delhi, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
