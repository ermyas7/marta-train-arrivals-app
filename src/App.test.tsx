import { render } from "@testing-library/react";
import React from "react";
import App from "./App";
import { TestWrapper } from "./utils/test-utils";

// Basic test for the app rendering without crashing
it("renders without crashing", () => {
  render(
    <TestWrapper>
      <App />
    </TestWrapper>
  );
});
