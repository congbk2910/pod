export type NavItemProps = {
  name: string;
  url: string;
  childs: any;
  root?: string;
};

export type PaginationProps = {
  itemsPerPage: number;
  itemsLength: number;
  currentPage: number;
};
