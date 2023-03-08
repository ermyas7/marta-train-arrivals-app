// Material UI
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// Internal
import { MartaArrivalOptionData } from "../../../api/types";
import { ArrivalFiltersFormData } from "../arrival-filters-form.data";

interface SelectFilterProps {
  name: string;
  label: string;
  value: string;
  formData: ArrivalFiltersFormData;
  availableOptions: {
    destinations?: Record<string, MartaArrivalOptionData>;
    lines?: Record<string, MartaArrivalOptionData>;
    stations?: Record<string, MartaArrivalOptionData>;
  };
  options: Record<string, MartaArrivalOptionData>;
  onChange: (e: SelectChangeEvent) => void;
}

/**
 * Component for displaying a select with options based on the available
 * options derived from existing selections
 * @param name Name of the input field
 * @param label Label for the input field
 * @param value Value of the controlled input
 * @param formData Current filter values
 * @param availableOptions What options should be available with the current filters -
 *    Ex: If this is for the "destination" input, which destinations are connected to
 *    the currently selected line and/or station
 * @param options Options for the select
 * @param onChange Input change handler function
 */
export const SelectFilter = (props: SelectFilterProps) => {
  /**
   * Function for determining whether an option should be disabled
   */
  const checkOptionDisabled = (optionKey: string): boolean => {
    // Holds the disabled outcomes
    let disableFromDestination: boolean = false,
      disableFromLine: boolean = false,
      disableFromStation: boolean = false;
    // If there is a destination filter set, check if the current option is valid for that destination
    if (!!props.availableOptions.destinations && !!props.formData.destination) {
      disableFromDestination = !props.availableOptions.destinations[
        props.formData.destination
      ]?.available.has(optionKey);
    }
    // If there is a line filter set, check if the current option is valid on that line
    if (!!props.availableOptions.lines && !!props.formData.line) {
      disableFromLine = !props.availableOptions.lines[
        props.formData.line
      ]?.available.has(optionKey);
    }
    // If there is a station filter set, check if the current option is valid for that station
    if (!!props.availableOptions.stations && !!props.formData.station) {
      disableFromStation = !props.availableOptions.stations[
        props.formData.station
      ]?.available.has(optionKey);
    }
    // If any of the availability didn't pass, disable the option
    return disableFromDestination || disableFromLine || disableFromStation;
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={`${props.name}-select-label`}>{props.label}</InputLabel>
      <Select
        labelId={`${props.name}-select-label`}
        id={`${props.name}-select`}
        name={props.name}
        value={props.value}
        label={props.label}
        onChange={props.onChange}
      >
        <MenuItem value={""}>Any</MenuItem>
        {Object.keys(props.options).map((key: string) => {
          return (
            <MenuItem
              key={`${props.name}-${key}`}
              value={key}
              disabled={checkOptionDisabled(key)}
            >
              {props.options[key].name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
