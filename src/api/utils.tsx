// Ideally I'd get station names from a record and match them to their IDs,
// but I can't find that so I'm just using a general title casing function
export const toTitleCase = (str: string): string => {
  // Remove "station" from stations to noramlize with destination names
  str = str.replace(" STATION", "");
  // Handle edge cases for names that need special formatting
  switch (str) {
    case "DOME":
      return "GWCC/CNN Center";
    case "HE HOLMES":
      return "H.E. Holmes";
    default:
      return str.toLowerCase().replace(/\b\S/g, (t) => {
        return t.toUpperCase();
      });
  }
};
