export type NavItemProps = {
  name: string;
  url: string;
  childs: any;
  root?: string | undefined;
};

export type PaginationProps = {
  itemsPerPage: number;
  itemsLength: number;
  currentPage: number;
};
