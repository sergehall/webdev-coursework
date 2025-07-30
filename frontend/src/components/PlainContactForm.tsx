// components/PlainContactForm.tsx
import React, { useState } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<FormData>;

const PlainContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

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
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg space-y-4 rounded-xl bg-gray-100 p-6 shadow-md dark:bg-gray-800 dark:text-white"
    >
      <h2 className="text-center text-xl font-semibold">Contact Us</h2>

      <div>
        <label className="block font-medium">Name</label>
        <input
          type="text"
          name="name"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-black dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-black dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Message</label>
        <textarea
          name="message"
          rows={4}
          className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-black dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-gray-900 px-4 py-2 text-white transition hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        Submit
      </button>

      {submittedData && (
        <div className="mt-6 rounded-md bg-white p-4 text-sm text-black shadow-inner dark:bg-gray-900 dark:text-white">
          <h3 className="mb-2 font-semibold">Submitted Data:</h3>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(submittedData, null, 2)}
          </pre>
        </div>
      )}
    </form>
  );
};

export default PlainContactForm;
