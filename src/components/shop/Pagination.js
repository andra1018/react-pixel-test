import React, { useEffect, useMemo } from "react";
import { ReactComponent as IconPrev } from "../../assets/svgs/icon-pagination-left.svg";
import { ReactComponent as IconNext } from "../../assets/svgs/icon-pagination-right.svg";
import classNames from "classnames";

const Pagination = (props) => {
  const { itemsPerPage, totalItems, pageNumber, setPageNumber } = props;

  const maxPageNumber = Math.ceil(totalItems / itemsPerPage);
  const DOTS = "-";
  const siblingCount = 1;

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < maxPageNumber) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleSelectPage = (pageNum) => {
    if (pageNum <= maxPageNumber && pageNum > 0) {
      setPageNumber(pageNum);
    }
  };

  useEffect(() => {
    if (pageNumber > maxPageNumber) {
      setPageNumber(1);
    }
  }, [pageNumber, maxPageNumber, setPageNumber]);

  const paginationRange = useMemo(() => {
    const maxPageCount = maxPageNumber;
    const maxPageNumbers = siblingCount + 5;
    if (maxPageNumbers + 1 >= maxPageCount) {
      return range(1, maxPageCount);
    }
    const leftSiblingIndex = Math.max(pageNumber - siblingCount, 1);
    const rightSiblingIndex = Math.min(pageNumber + siblingCount, maxPageCount);
    const shouldShowLeftDots = leftSiblingIndex > 3;
    const shouldShowRightDots = rightSiblingIndex < maxPageCount - 2;
    const firstPageIndex = 1;
    const lastPageIndex = maxPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, maxPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(maxPageCount - rightItemCount + 1, maxPageCount);

      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [maxPageNumber, siblingCount, pageNumber]);

  return (
    <>
      {maxPageNumber !== 1 && pageNumber <= maxPageNumber && (
        <div className="pagination">
          <div className="page-actions">
            <div
              onClick={() => pageNumber > 1 && handlePrevPage()}
              className={classNames("icon-arrow", {
                disabled: !(pageNumber > 1),
              })}
            >
              <IconPrev />
            </div>
            <ul>
              {paginationRange.map((number, index) => (
                <li
                  key={index}
                  className={`page_itemNum ${
                    pageNumber === number
                      ? "selected_page_itemNum"
                      : "disable_page_itemNum"
                  } ${number === DOTS ? "dot_disable" : ""}`}
                  onClick={() => handleSelectPage(number)}
                >
                  {number}
                </li>
              ))}
            </ul>
            <div
              className={classNames("icon-arrow", {
                disabled: !(pageNumber < maxPageNumber),
              })}
              onClick={() => pageNumber < maxPageNumber && handleNextPage()}
            >
              <IconNext />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Pagination;
