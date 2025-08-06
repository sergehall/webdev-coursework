import ResetButton from "@/components/buttons/ResetButton";
import SubmitButton from "@/components/buttons/SubmitButton";
import SuccessBar from "@/components/SuccessBar";
import { useFormSubmitHandler } from "@/hooks/useFormSubmitHandler";
import { DownloadHtmlButton } from "@/components/buttons";

const WebsiteRegistrationForm = () => {
  const { handleSubmit, submitted, loading } = useFormSubmitHandler({
    showSuccessBar: true,
    simulateRequest: true,
    delayMs: 500,
    onSuccess: () => {
      console.log("Form sent successfully");
    },
  });

  return (
    <div className="relative space-y-6">
      {submitted && <SuccessBar message="Registration successful" />}

      {/* Task prompt block */}
      <div className="w-full rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-2 text-[0.95rem] font-medium italic text-yellow-800 dark:border-gray-600 dark:bg-gray-500/40 dark:text-gray-100">
        <strong>Task:</strong> Create a website registration form to obtain a
        user’s first name, last name and e-mail address. In addition, include an
        optional survey question that asks the user’s year in college (e.g.,
        Freshman). Place the optional survey question in a{" "}
        <code>&lt;details&gt;</code> element that the user can expand to see the
        question.
      </div>
      <DownloadHtmlButton
        fileUrl="/code-playground/CS80/mod-1/website-registration-form.html"
        filename="website-registration-form.html"
      />

      {/* Registration form */}
      <form
        onSubmit={handleSubmit(() => {
          console.log("Submitting the form...");
        })}
        className="mx-auto max-w-2xl space-y-6 rounded-md border border-gray-300 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
      >
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Please fill out this form to register.
        </p>

        {/* First Name */}
        <div className="mx-auto w-full max-w-md">
          <label className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200">
            First Name:
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            required
            className="w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Last Name */}
        <div className="mx-auto w-full max-w-md">
          <label className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200">
            Last Name:
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            required
            className="w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Email */}
        <div className="mx-auto w-full max-w-md">
          <label className="mb-1 block text-sm font-medium text-gray-800 dark:text-gray-200">
            Email Address:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full rounded border border-gray-300 bg-gray-50 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Optional Survey */}
        <div className="mx-auto w-full max-w-md">
          <details className="rounded-md bg-gray-100 p-4 dark:bg-gray-800">
            <summary className="mb-2 cursor-pointer font-medium text-gray-800 dark:text-gray-100">
              Optional: Tell us your year in college
            </summary>
            <div className="mt-4 space-y-2">
              {["Freshman", "Sophomore", "Junior", "Senior", "Graduate"].map(
                (year) => (
                  <label
                    key={year}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <input
                      type="radio"
                      name="collegeYear"
                      value={year.toLowerCase()}
                      className="mr-2 accent-blue-600 dark:accent-blue-400"
                    />
                    {year}
                  </label>
                )
              )}
            </div>
          </details>
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

export default WebsiteRegistrationForm;
