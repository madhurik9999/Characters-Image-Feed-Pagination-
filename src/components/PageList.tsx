import React from "react";

interface PageListProps {
  data: {
    info: {
      count: number;
      pages: number;
      next: string;
      prev: string;
    };
  };
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const PageList: React.FC<PageListProps> = ({ data, page, setPage }) => {
  const handlePrevPage = () => {
    if (data.info.prev) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (data.info.next) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderPageNumbers = () => {
    if (!data) return null;

    const totalPages = data.info.pages;
    const currentPage = page;

    // Display exactly 10 page blocks at a time
    const blocksToShow = 10;
    const halfBlocks = Math.floor(blocksToShow / 2);
    let startPage = currentPage - halfBlocks;
    let endPage = currentPage + halfBlocks;

    if (startPage < 1) {
      startPage = 1;
      endPage = blocksToShow;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - blocksToShow + 1);
    }

    const pagesArray = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    return (
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <li
            onClick={handlePrevPage}
            className={data.info.prev ? "" : "pointer-events-none opacity-50"}
          >
            <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover-text-gray-700 dark:bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white">
              Previous
            </a>
          </li>

          {startPage > 1 && (
            <li>
              <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white">
                ...
              </a>
            </li>
          )}
          {pagesArray.map((pageNumber) => (
            <li key={pageNumber}>
              <a
                onClick={() => setPage(pageNumber)}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white"
              >
                {pageNumber}
              </a>
            </li>
          ))}
          {endPage < totalPages && (
            <li>
              <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white">
                ...
              </a>
            </li>
          )}

          <li
            onClick={handleNextPage}
            className={data.info.next ? "" : "pointer-events-none opacity-50"}
          >
            <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white">
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  return <div>{renderPageNumbers()}</div>;
};

export default PageList;
