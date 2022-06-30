import { PaginationProps } from "@appTypes/all-types";
import Router from "next/router";
import ReactPaginate from "react-paginate";
import styles from "./styles.module.css";

const Pagination = (props: PaginationProps) => {
  const { itemsPerPage, itemsLength, currentPage } = props;

  const pageCount = Math.ceil(itemsLength / itemsPerPage);

  const handlePageClick = (event: any) => {
    const currentPath = Router.pathname;
    const currentQuery = Router.query;
    currentQuery.page = event.selected + 1;

    Router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  return (
    <ReactPaginate
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      pageClassName={styles.pageItem}
      pageLinkClassName={styles.pageLink}
      previousClassName={styles.pageItem}
      previousLinkClassName={styles.pageLink}
      nextClassName={styles.pageItem}
      nextLinkClassName={styles.pageLink}
      breakLabel="..."
      breakClassName={styles.pageItem}
      breakLinkClassName={styles.pageLink}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      disabledClassName={styles.disabled}
    />
  );
};

export default Pagination;
