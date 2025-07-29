// src/App.tsx

import AppRoutes from "./routes/AppRoutes";

/**
 * App
 * Root-level component that defines all application routes.
 * Separated from global providers, which are handled in main.tsx.
 *
 * Acts as the main UI entry point for route-based rendering.
 */
const App = () => <AppRoutes />;

export default App;
