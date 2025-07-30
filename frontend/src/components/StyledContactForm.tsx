// components/StyledContactForm.tsx
import React, { useState } from "react";
import confetti from "canvas-confetti";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<FormData>;

const StyledContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      triggerConfetti();
    } else {
      setErrors(validationErrors);
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 p-6 shadow-lg dark:from-indigo-200/10 dark:to-purple-200/10 dark:text-white">
      <h2 className="mb-6 text-center text-2xl font-bold text-indigo-800 dark:text-indigo-200">
        Stylish Contact Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {["name", "email", "message"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-semibold capitalize">
              {field}
            </label>

            {field !== "message" ? (
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={
                  field === "name"
                    ? "Your name"
                    : field === "email"
                      ? "your-email@example.com"
                      : ""
                }
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-2 border-gray-300 bg-gray-100 p-2 text-black focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
            ) : (
              <textarea
                name="message"
                rows={5}
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border-2 border-gray-300 bg-gray-100 p-2 text-black focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
            )}

            {errors[field as keyof FormData] && (
              <p className="mt-1 text-sm text-red-500">
                {errors[field as keyof FormData]}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-full transform rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 font-semibold text-white transition duration-200 hover:scale-105 hover:shadow-lg dark:from-violet-500 dark:to-indigo-500 ${
            isHovered ? "shadow-2xl" : ""
          }`}
        >
          Send Message
        </button>
      </form>

      {submittedData && (
        <div className="mt-6 rounded-md bg-white p-4 text-sm text-black shadow-inner dark:bg-gray-900 dark:text-white">
          <h3 className="mb-2 font-semibold">Submitted Data:</h3>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default StyledContactForm;
