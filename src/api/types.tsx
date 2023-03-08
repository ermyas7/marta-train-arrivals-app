export interface ArrivalData {
  DESTINATION: string;
  LINE: string;
  STATION: string;
  WAITING_SECONDS: string;
  WAITING_TIME: string;
  DIRECTION: string;
}

export interface GetMartaArrivalsResponse {
  data: {
    RailArrivals: ArrivalData[];
  };
}

export interface MartaArrivalOptionData {
  name: string;
  available: Set<string>;
}

export interface MartaArrivals {
  arrivals: ArrivalData[];
  destinations: Record<string, MartaArrivalOptionData>;
  lines: Record<string, MartaArrivalOptionData>;
  stations: Record<string, MartaArrivalOptionData>;
}
