// PageList.tsx
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

    // Determine the range of page numbers to display
    const startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(totalPages, currentPage + 5);

    const pagesArray = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    return (
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <li onClick={handlePrevPage}>
            <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Previous
            </a>
          </li>

          {startPage > 1 && (
            <li>
              <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                ...
              </a>
            </li>
          )}
          {pagesArray.map((pageNumber) => (
            <li key={pageNumber}>
              <a
                onClick={() => setPage(pageNumber)}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {pageNumber}
              </a>
            </li>
          ))}
          {endPage < totalPages && (
            <li>
              <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                ...
              </a>
            </li>
          )}

          <li onClick={handleNextPage}>
            <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
