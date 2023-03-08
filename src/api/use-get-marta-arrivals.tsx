import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { apiKey, corsProxyURL } from "./config";
import { toTitleCase } from "./utils";
import {
  GetMartaArrivalsResponse,
  MartaArrivalOptionData,
  MartaArrivals
} from "./types";

// Cors-anywhere is rate limited to 50 requests per hour, so I am refetching
// every 2 minutes to prevent going over their limit
export const useGetMartaArrivals = () => {
  const config = {
    method: "get",
    params: { apiKey },
    url: `${corsProxyURL}https://developerservices.itsmarta.com:18096/railrealtimearrivals`
  };
  return useQuery<MartaArrivals, AxiosError>(
    "marta-arrivals",
    () =>
      axios(config).then((res: GetMartaArrivalsResponse) => {
        const arrivals = res.data.RailArrivals;

        // Building the options from the data because I didn't find
        // an API to get all the potential values or documentation
        const destinations: Record<string, MartaArrivalOptionData> = {},
          lines: Record<string, MartaArrivalOptionData> = {},
          stations: Record<string, MartaArrivalOptionData> = {};

        arrivals.forEach((arrival): void => {
          const dataDest: string = arrival.DESTINATION,
            dataLine: string = arrival.LINE,
            dataStation: string = arrival.STATION;

          if (!destinations[dataDest]) {
            destinations[dataDest] = {
              name: toTitleCase(dataDest),
              available: new Set()
            };
          }
          if (!lines[dataLine]) {
            lines[dataLine] = {
              name: toTitleCase(dataLine),
              available: new Set()
            };
          }
          if (!stations[dataStation]) {
            stations[dataStation] = {
              name: toTitleCase(dataStation),
              available: new Set()
            };
          }
          destinations[dataDest].available.add(dataLine).add(dataStation);
          lines[dataLine].available.add(dataDest).add(dataStation);
          stations[dataStation].available.add(dataDest).add(dataLine);
        });
        return {
          arrivals,
          destinations,
          lines,
          stations
        };
      }),
    { refetchInterval: 120000 }
  );
};
