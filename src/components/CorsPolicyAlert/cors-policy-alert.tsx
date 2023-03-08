import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

/** -- Context --
 * Using `cors-anywhere` to get around the cors violation between codesandbox and
 * MARTA developer tools. Reasoning was that it's the fastest and easiest solution
 * I was able to find that is also free.
 */

/**
 * Component for displaying an alert indicating the need for using cors-anywhere
 * and re-directing user to the necessary page to enable the proxy on their browser
 */
export const CorsPolicyAlert = () => {
  return (
    <Box width="100%" margin="15px">
      <Alert severity="info">
        To by-pass the cors policy issue between CodeSandbox and Marta Developer
        Services, set up the proxy by requesting access to the&nbsp;
        <a
          href="https://cors-anywhere.herokuapp.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          cors-anywhere demo server
        </a>
      </Alert>
    </Box>
  );
};
