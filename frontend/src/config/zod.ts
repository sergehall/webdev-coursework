import { z } from "zod";

// The browser CSP blocks dynamic code evaluation. Configure Zod before any
// schemas are created so validation uses its interpreter without probing eval.
z.config({ jitless: true });

export { z };
