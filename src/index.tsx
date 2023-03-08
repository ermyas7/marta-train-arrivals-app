// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Internal
import App from "./App";
import MuiThemeProvider from "./utils/mui-theme-provider";
import ReactQueryProvider from "./utils/react-query-provider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ReactQueryProvider>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </ReactQueryProvider>
  </StrictMode>
);
