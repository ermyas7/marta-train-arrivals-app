import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

interface HelpPopoverProps {
  id: string;
  open: boolean;
  anchorEl: null | HTMLElement;
  onClose: () => void;
}

/**
 * Component for displaying a "popover" (simple modal) that contains helpful
 * information about the application
 * @param id Id of the popover component
 * @param open Whether the popover is displayed or not
 * @param anchorEl Element to attach the popover to
 * @param onClose Component close handler function
 */
export const HelpPopover = (props: HelpPopoverProps) => {
  return (
    <Popover
      id={props.id}
      open={props.open}
      anchorEl={props.anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      onClose={props.onClose}
    >
      <Box padding="15px" maxWidth="300px">
        <Typography variant="body2" color="text.primary">
          Arrival Filters
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Set arrival filters to display the next 10 upcoming MARTA train
          arrivals.
        </Typography>
        <Divider sx={{ margin: "10px 0" }} />
        <Typography variant="body2" color="text.primary">
          Arrival List
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The list of upcoming arrivals will be displayed in sections:
        </Typography>
        <Typography variant="body2" component="span" color="text.secondary">
          <ol style={{ margin: "5px 0 0", paddingLeft: "30px" }}>
            <li>
              Line Icon
              <ul>
                <li>Color indicates train line</li>
                <li>Letter indicates train direction</li>
              </ul>
            </li>
            <li>Time - Time until the station arrival</li>
            <li>Station - Station that the train is arriving at</li>
            <li>Destination - End station for train line</li>
          </ol>
        </Typography>
      </Box>
    </Popover>
  );
};
