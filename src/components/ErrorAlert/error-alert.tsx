import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

/**
 * Component for displaying an error alert
 * @param children A react node that will be wrapped with the error alert
 */
export const ErrorAlert = (props: { children: React.ReactNode }) => {
  return (
    <Box padding="15px">
      <Alert severity="error">{props.children}</Alert>
    </Box>
  );
};
