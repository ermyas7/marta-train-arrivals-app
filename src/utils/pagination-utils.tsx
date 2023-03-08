export const itemsPerPage: number = 10;

export const showPageItem = (index: number, page: number): boolean => {
  // The lower index value to show items
  const pageLowerLimit: number = itemsPerPage * (page - 1);
  // The upper index value to show items
  const pageUpperLimit: number = itemsPerPage * page;

  return index >= pageLowerLimit && index < pageUpperLimit;
};
