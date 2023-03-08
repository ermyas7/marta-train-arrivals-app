// React
import React, { useState } from "react";
// Material UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useGetMartaArrivals } from "./api/use-get-marta-arrivals";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
// Internal
import { ArrivalFiltersFormData as FilterData } from "./components/ArrivalFiltersForm/arrival-filters-form.data";
import {
  MartaAppBar,
  ArrivalFiltersForm,
  ArrivalList,
  CorsPolicyAlert,
  ErrorAlert
} from "./components";
import "./styles.css";

const AppContainer = styled(Container)(({ theme }) => ({
  marginTop: "25px",
  [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
    marginTop: "15px"
  }
}));

const App = () => {
  const { data, error, isLoading } = useGetMartaArrivals();
  const [arrivalFilters, setArrivalFilters] = useState<FilterData>();

  if (isLoading) return <LinearProgress />;

  if (error) {
    return error.response?.status === 403 ? (
      <CorsPolicyAlert />
    ) : (
      <ErrorAlert>
        {(error.response?.data as string) || "Network Error"}
      </ErrorAlert>
    );
  }

  return (
    <>
      <MartaAppBar />
      <AppContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
            <ArrivalFiltersForm
              data={data}
              onFormChange={(formData: FilterData) =>
                setArrivalFilters(formData)
              }
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <ArrivalList data={data} filters={arrivalFilters} />
          </Grid>
        </Grid>
      </AppContainer>
    </>
  );
};

export default App;
