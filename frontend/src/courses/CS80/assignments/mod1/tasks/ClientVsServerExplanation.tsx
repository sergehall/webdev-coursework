// src/assignments/mod1/tasks/ClientVsServerExplanation.tsx
import { DownloadHtmlButton } from "@/components/buttons";
const ClientVsServerExplanation = () => {
  return (
    <div className="space-y-4">
      {/* Task prompt block – styled as a highlighted note */}
      <div className="rounded-md border-l-4 border-yellow-400 bg-yellow-50 px-4 py-2 text-[0.95rem] font-medium italic text-yellow-800 dark:border-gray-600 dark:bg-gray-500/40 dark:text-gray-100">
        <strong>Task:</strong> Describe the difference between client-side
        programming and server-side programming.
      </div>

      <p className="text-gray-700 dark:text-gray-300">
        Client-side programming and server-side programming refer to two
        different areas of web development, each responsible for different tasks
        in delivering and managing web content. Here’s a breakdown of the key
        differences:
      </p>

      <DownloadHtmlButton
        fileUrl="/code-playground/CS80/mod-1/client-vs-server.html"
        filename="client-vs-server.html"
      />

      {/* Client-side explanation */}
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-100">
          Client-Side Programming
        </h4>
        <ul className="list-inside list-disc text-gray-700 dark:text-gray-300">
          <li>
            <strong>Runs on:</strong> The user's browser (e.g., Chrome, Firefox,
            Safari).
          </li>
          <li>
            <strong>Languages:</strong> HTML, CSS, JavaScript (and frameworks
            like React, Angular, Vue).
          </li>
          <li>
            <strong>Purpose:</strong> Handles the user interface (UI) and user
            experience (UX).
          </li>
          <li>
            <strong>Examples of tasks:</strong>
            <ul className="ml-6 list-disc">
              <li>Form validation before submission</li>
              <li>Animations and dynamic content updates</li>
              <li>Handling user inputs (clicks, keystrokes)</li>
              <li>Rendering the UI</li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Server-side explanation */}
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-100">
          Server-Side Programming
        </h4>
        <ul className="list-inside list-disc text-gray-700 dark:text-gray-300">
          <li>
            <strong>Runs on:</strong> The web server (e.g., Apache, Nginx,
            Node.js server).
          </li>
          <li>
            <strong>Languages:</strong> PHP, Python, Ruby, Java, C#, Node.js,
            etc.
          </li>
          <li>
            <strong>Purpose:</strong> Manages backend logic, databases, and data
            processing.
          </li>
          <li>
            <strong>Examples of tasks:</strong>
            <ul className="ml-6 list-disc">
              <li>Authenticating users</li>
              <li>Processing form submissions</li>
              <li>Querying and updating a database</li>
              <li>
                Generating dynamic pages before sending them to the client
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Summary table */}
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-100">
          Summary of the Difference
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left text-sm dark:border-gray-700">
            <thead className="bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
              <tr>
                <th className="border px-4 py-2">Aspect</th>
                <th className="border px-4 py-2">Client-Side</th>
                <th className="border px-4 py-2">Server-Side</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr>
                <td className="border px-4 py-2">Executes on</td>
                <td className="border px-4 py-2">Web browser</td>
                <td className="border px-4 py-2">Web server</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Controls</td>
                <td className="border px-4 py-2">UI and interactivity</td>
                <td className="border px-4 py-2">
                  Business logic and data processing
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Visible to user</td>
                <td className="border px-4 py-2">
                  Yes (source code can be seen)
                </td>
                <td className="border px-4 py-2">No (hidden from the user)</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Example Language</td>
                <td className="border px-4 py-2">JavaScript</td>
                <td className="border px-4 py-2">Python, PHP, Node.js, etc.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientVsServerExplanation;
