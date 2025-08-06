// src/assignments/mod1/tasks/CampusFeedbackForm.tsx
import { DownloadHtmlButton } from "@/components/buttons";
import ResetButton from "@/components/buttons/ResetButton";
import SubmitButton from "@/components/buttons/SubmitButton";
import SuccessBar from "@/components/SuccessBar";
import { useFormSubmitHandler } from "@/hooks/useFormSubmitHandler";

const CampusFeedbackForm = () => {
  const { handleSubmit, submitted, loading } = useFormSubmitHandler({
    showSuccessBar: true,
    simulateRequest: true,
    delayMs: 500,
    onSuccess: () => {
      console.log("Campus feedback submitted!");
    },
  });

  return (
    <div className="relative space-y-6">
      {/* Success bar */}
      {submitted && <SuccessBar message="Feedback submitted successfully" />}

      {/* Task prompt block */}
      <div className="w-full rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-2 text-[0.95rem] font-medium italic text-yellow-800 dark:border-gray-600 dark:bg-gray-500/40 dark:text-gray-100">
        <strong>Task:</strong> A local university has asked you to create an
        HTML5 document that allows prospective college students to provide
        feedback about their campus visit. Your HTML5 document should contain a
        form with text fields for a name and e-mail. Provide checkboxes that
        allow prospective students to indicate what they liked most about the
        campus. The checkboxes should include: campus, students, location,
        atmosphere, dorm rooms and sports. Also, provide radio buttons that ask
        the prospective students how they became interested in the college.
        Options should include: friends, television, Internet and other. In
        addition, provide a text area for additional comments, a submit button
        and a reset button.
      </div>

      <DownloadHtmlButton
        fileUrl="/code-playground/CS80/mod-1/campus-feedback-form.html"
        filename="campus-feedback-form.html"
      />

      {/* Form */}
      <form
        onSubmit={handleSubmit(() => {
          console.log("Form submitted!");
        })}
        className="mx-auto max-w-2xl space-y-6 rounded-md border border-gray-300 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
      >
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Use this form to give feedback about your campus visit.
        </p>

        {/* Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200">
            Name:
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            className="w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200">
            Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Checkboxes */}
        <div>
          <p className="mb-2 font-semibold text-gray-800 dark:text-gray-100">
            What did you like?
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Campus",
              "Students",
              "Location",
              "Atmosphere",
              "Dorm Rooms",
              "Sports",
            ].map((item) => (
              <label
                key={item}
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <input
                  type="checkbox"
                  name="likes"
                  value={item.toLowerCase().replace(" ", "")}
                  className="mr-2 accent-blue-600 focus:ring focus:ring-blue-300 dark:accent-blue-400 dark:focus:ring-blue-500"
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Radio buttons */}
        <div>
          <p className="mb-2 font-semibold text-gray-800 dark:text-gray-100">
            How did you hear about us?
          </p>
          <div className="grid grid-cols-2 gap-2">
            {["Friends", "Television", "Internet", "Other"].map((item) => (
              <label
                key={item}
                className="flex items-center text-gray-700 dark:text-gray-300"
              >
                <input
                  type="radio"
                  name="interest"
                  value={item.toLowerCase()}
                  className="mr-2 accent-blue-600 focus:ring focus:ring-blue-300 dark:accent-blue-400 dark:focus:ring-blue-500"
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Comments */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200">
            Comments:
          </label>
          <textarea
            name="comments"
            rows={4}
            placeholder="Your feedback..."
            className="w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <div className="flex justify-center gap-4">
            <SubmitButton loading={loading} submitted={submitted} />
            <ResetButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CampusFeedbackForm;
