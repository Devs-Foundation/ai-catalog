import { createRoot } from "react-dom/client";
import { setBaseUrl } from "@workspace/api-client-react";
import App from "./App";
import "./index.css";

// Prefix API requests with the app's base path (e.g. "/catalogo") so the site
// can be served under a sub-path behind a reverse proxy. On root/dev deploys
// BASE_URL is "/", which resolves to no prefix (relative requests).
setBaseUrl(import.meta.env.BASE_URL);

createRoot(document.getElementById("root")!).render(<App />);
