import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";

declare module "@mui/material/styles" {
  /**
   * Adds custom theme configurations to the Material-UI component interface
   * - `xsMobile` Smallest breakpoint for thin mobile devices
   * - `mobile` Breakpoint for large phone and small tablets
   */
  interface BreakpointOverrides {
    xsMobile: true;
    mobile: true;
  }
}

/**
 * Material-UI theme configuration
 */
const theme: Theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      xsMobile: 400,
      mobile: 500,
      sm: 750,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  }
});

/**
 * Material-UI theme HOC with configured theme settings
 */
const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MuiThemeProvider;
