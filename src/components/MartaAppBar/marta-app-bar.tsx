// React
import * as React from "react";
// Material UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { HelpPopover } from "./components/help-popover";
import { styled } from "@mui/material/styles";
// Internal
// @ts-ignore
import MartaStripes from "../../images/marta-stripes.png";
// @ts-ignore
import MartaLogo from "../../images/marta-logo-white.png";

const BrandBox = styled("div")(({ theme }) => ({
  height: "25px",
  // @ts-ignore
  [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
    display: "none"
  }
}));

const LogoBox = styled("div")(({ theme }) => ({
  height: "25px",
  // @ts-ignore
  [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
    height: "20px"
  }
}));

const AppHeader = styled(Typography)(({ theme }) => ({
  // @ts-ignore
  [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
    fontSize: "1rem"
  }
}));

/**
 * Component for displaying an application bar that contains branding, the application header,
 * and a help button to describe the application usage
 */
export function MartaAppBar() {
  const [helpAnchorEl, setHelpAnchorEl] = React.useState<null | HTMLElement>(
    null
  );

  /**
   * Function for handling clicks on the help icon
   */
  const handleHelpClick = (event: React.MouseEvent<HTMLElement>) => {
    setHelpAnchorEl(event.currentTarget);
  };

  /**
   * Function for handling clicks outside of the help popover (close action)
   */
  const handleHelpClose = () => {
    setHelpAnchorEl(null);
  };

  const open = Boolean(helpAnchorEl);
  const id = open ? "help-popover" : undefined;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HelpPopover
        id={id}
        open={open}
        anchorEl={helpAnchorEl}
        onClose={handleHelpClose}
      />
      <AppBar position="static" sx={{ backgroundColor: grey[700] }}>
        <Toolbar>
          <BrandBox>
            <img src={MartaLogo} height="100%" alt="MARTA" />
          </BrandBox>
          <LogoBox>
            <img src={MartaStripes} height="100%" alt="" />
          </LogoBox>
          <Box flexGrow="1" paddingLeft="15px">
            <AppHeader variant="h6">Train Arrivals Tracker</AppHeader>
          </Box>
          <IconButton
            aria-describedby={id}
            size="large"
            aria-label="app info"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleHelpClick}
            color="inherit"
          >
            <HelpIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
