Welcome to the MARTA train arrivals tracker

CORS Proxy

- To make use of this tracker requires setting up a cors proxy. This can be done by following the alert you should have gotten by running the application. Otherwise it can be reached here: https://cors-anywhere.herokuapp.com

Developer Notes

- Written in TypeScript with Material-UI

- Uses react-query and Axios for api hooks and polling (2 minute intervals)

- QOL features
  -- Contextually disabling filter values based on other selections (ex: if you pick red line, only allows selecting stations on the red line)
  -- Responsive down to phone screen size
