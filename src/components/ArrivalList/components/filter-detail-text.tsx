import Typography from "@mui/material/Typography";

/**
 * Component for displaying formatted text about the filters within the arrivals list
 * @param children A react node that will be wrapped with the formatted typography component
 */
export const FilterDetailText = (props: { children: React.ReactNode }) => {
  return (
    <Typography variant="body1" padding="10px" color="text.secondary">
      {props.children}
    </Typography>
  );
};
