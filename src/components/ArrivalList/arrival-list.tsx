// React
import React, { useEffect, useState } from "react";
// Material UI
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
// Internal
import { ArrivalFiltersFormData as FilterData } from "../ArrivalFiltersForm/arrival-filters-form.data";
import { ArrivalData, MartaArrivals } from "../../api/types";
import { ArrivalDetailAvatar } from "./components/arrival-detail-avatar";
import { ArrivalDetailText } from "./components/arrival-detail-text";
import { FilterDetailText } from "./components/filter-detail-text";
import { itemsPerPage, showPageItem } from "../../utils/pagination-utils";

const ArrivalsPaper = styled(Paper)(({ theme }) => ({
  padding: "8px",
  // @ts-ignore
  [theme.breakpoints.down(theme.breakpoints.values.mobile)]: {
    padding: 0
  }
}));

const PaginationWrapper = styled(Box)(({ theme }) => ({
  justifyContent: "end",
  display: "flex",
  padding: "10px 0",
  "& .MuiPaginationItem-firstLast": {
    display: "none"
  },
  // @ts-ignore
  [theme.breakpoints.down(theme.breakpoints.values.xsMobile)]: {
    "& .MuiPaginationItem-firstLast": {
      display: "inline-flex"
    },
    "& button, & .MuiPaginationItem-ellipsis": {
      display: "none"
    },
    "& .Mui-selected, & .MuiPaginationItem-previousNext": {
      display: "inline-flex"
    }
  }
}));

interface ArrivalListProps {
  data: MartaArrivals;
  filters: FilterData;
}

/**
 * Component for displaying a list of train arrivals based on filters
 * @param data Arrivals list data
 * @param filters Arrivals filters
 */
export const ArrivalList = (props: ArrivalListProps) => {
  const [page, setPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(1);
  const [arrivals, setArrivals] = useState<ArrivalData[]>([]);

  /**
   * Hook for filtering the arrivals based on the selected filter values
   */
  useEffect(() => {
    if (!props.data) return;
    const filteredArrivals = props.data.arrivals
      .filter((arrivalData) => {
        const filters: FilterData | undefined = props.filters;
        const matchDest: boolean =
          !filters?.destination ||
          filters.destination === arrivalData.DESTINATION;
        const matchLine: boolean =
          !filters?.line || filters.line === arrivalData.LINE;
        const matchStation: boolean =
          !filters?.station || filters.station === arrivalData.STATION;
        return matchDest && matchLine && matchStation;
      })
      .sort(
        (a, b) => parseFloat(a.WAITING_SECONDS) - parseFloat(b.WAITING_SECONDS)
      );
    setArrivals(filteredArrivals);
    if (!!filteredArrivals.length) {
      setNumPages(Math.ceil(filteredArrivals.length / itemsPerPage));
    } else {
      setNumPages(1);
    }
  }, [props]);

  /**
   * Hook for verifying the current page number is within the range of pages
   */
  useEffect(() => {
    if (page > numPages) {
      setPage(numPages);
    }
  }, [page, numPages]);

  /**
   * Function for handling arrivals list page change
   */
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <ArrivalsPaper elevation={2}>
      {arrivals.length > 0 ? (
        <>
          <List sx={{ padding: "4px 0" }}>
            {arrivals.map((arrivalData, index) => {
              return showPageItem(index, page) ? (
                <React.Fragment key={`arrival-${index}`}>
                  <ListItem alignItems="flex-start">
                    <ArrivalDetailAvatar
                      line={arrivalData.LINE}
                      direction={arrivalData.DIRECTION}
                    />
                    <Grid container>
                      {/** @ts-ignore */}
                      <Grid item xs={6} xsMobile={3}>
                        <ArrivalDetailText
                          label="Time"
                          value={arrivalData.WAITING_TIME}
                        />
                      </Grid>
                      {/** @ts-ignore */}
                      <Grid item xs={6} xsMobile={5}>
                        <ArrivalDetailText
                          label="Station"
                          value={
                            props.data.stations[arrivalData.STATION]?.name ||
                            arrivalData.STATION
                          }
                        />
                      </Grid>
                      {/** @ts-ignore */}
                      <Grid item xs={12} xsMobile={4}>
                        <ArrivalDetailText
                          label="Destination"
                          value={
                            props.data.destinations[arrivalData.DESTINATION]
                              ?.name || arrivalData.DESTINATION
                          }
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  {index < arrivals.length - 1 ? (
                    <Divider variant="inset" component="li" />
                  ) : null}
                </React.Fragment>
              ) : null;
            })}
          </List>
          {numPages > 1 ? (
            <PaginationWrapper>
              <Pagination
                showFirstButton
                showLastButton
                count={numPages}
                page={page}
                onChange={handlePageChange}
              />
            </PaginationWrapper>
          ) : null}
        </>
      ) : (
        <FilterDetailText>No arrivals match filters</FilterDetailText>
      )}
    </ArrivalsPaper>
  );
};
