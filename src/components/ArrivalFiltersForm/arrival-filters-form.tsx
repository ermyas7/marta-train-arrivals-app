// React
import { useState, useEffect } from "react";
// Material UI
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
// Internal
import { ArrivalFiltersFormData } from "./arrival-filters-form.data";
import { MartaArrivals } from "../../api/types";
import { SelectFilter } from "./components/select-filter";

const FormHeader = styled(Typography)(({ theme }) => ({
  margin: "5px 0 15px",
  // @ts-ignore
  [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
    fontSize: "1rem"
  }
}));

interface ArrivalFiltersFormProps {
  data: MartaArrivals;
  onFormChange: (formData: ArrivalFiltersFormData) => void;
}

/**
 * Component for displaying a form with select filters for the arrivals list
 * @param data Arrivals list data
 * @param onFormChange Form change handler function
 */
export const ArrivalFiltersForm = (props: ArrivalFiltersFormProps) => {
  const [formState, setFormState] = useState<ArrivalFiltersFormData>({
    destination: "",
    line: "",
    station: ""
  });

  /**
   * Hook for determining whether an option should be de-selected when a data change
   * results in that option no longer being available
   */
  useEffect(() => {
    const data: MartaArrivals = props.data;
    const destination: string = !!data.destinations[formState.destination]
      ? formState.destination
      : "";
    const line: string = !!data.lines[formState.line] ? formState.line : "";
    const station: string = !!data.stations[formState.station]
      ? formState.station
      : "";
    setFormState({ destination, line, station });
    props.onFormChange({ destination, line, station });
  }, [formState, props]);

  /**
   * Function for handling input changes in a generic method by setting the state based on
   * the name of the input
   */
  const handleChange = (event: SelectChangeEvent) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Paper elevation={2} sx={{ padding: "10px" }}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          width: "100%",
          "& > .MuiFormControl-root:not(:first-of-type)": {
            marginTop: "20px"
          }
        }}
      >
        <FormHeader variant="h6" color="text.secondary">
          Arrival Filters
        </FormHeader>
        <SelectFilter
          name="destination"
          label="Destination"
          value={formState.destination}
          formData={formState}
          availableOptions={{
            lines: props.data.lines,
            stations: props.data.stations
          }}
          options={props.data.destinations}
          onChange={handleChange}
        />
        <SelectFilter
          name="line"
          label="Line"
          value={formState.line}
          formData={formState}
          availableOptions={{
            destinations: props.data.destinations,
            stations: props.data.stations
          }}
          options={props.data.lines}
          onChange={handleChange}
        />
        <SelectFilter
          name="station"
          label="Station"
          value={formState.station}
          formData={formState}
          availableOptions={{
            destinations: props.data.destinations,
            lines: props.data.lines
          }}
          options={props.data.stations}
          onChange={handleChange}
        />
      </Box>
    </Paper>
  );
};
