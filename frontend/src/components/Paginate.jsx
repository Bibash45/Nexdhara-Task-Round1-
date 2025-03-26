import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Paginate = ({ pages, page, keyword }) => {
  const pageNumbers = [...Array(pages).keys()].map((x) => x + 1);

  const start = Math.max(1, page - 2);
  const end = Math.min(pages, page + 2);
  const pageRange = pageNumbers.filter(
    (number) => number >= start && number <= end
  );

  const getPageLink = (num) =>
      keyword
        ? `/?keyword=${keyword}&pageNumber=${num}`
        : `/?pageNumber=${num}`


  return (
    pages > 1 && (
      <div className="flex items-center justify-end space-x-2 mt-4">
        {/* Previous Button */}
        {page > 1 && (
          <Link
            to={getPageLink(page - 1)}
            className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center"
          >
            <FaChevronLeft />
          </Link>
        )}

        {/* First Page with Ellipsis */}
        {start > 1 && (
          <>
            <Link
              to={getPageLink(1)}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              1
            </Link>
            {start > 2 && <span className="px-3 py-2 text-gray-500">...</span>}
          </>
        )}

        {/* Page Numbers */}
        {pageRange.map((number) => (
          <Link
            key={number}
            to={getPageLink(number)}
            className={`px-3 py-2 rounded-md ${
              number === page
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {number}
          </Link>
        ))}

        {/* Last Page with Ellipsis */}
        {end < pages && (
          <>
            {end < pages - 1 && (
              <span className="px-3 py-2 text-gray-500">...</span>
            )}
            <Link
              to={getPageLink(pages)}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              {pages}
            </Link>
          </>
        )}

        {/* Next Button */}
        {page < pages && (
          <Link
            to={getPageLink(page + 1)}
            className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center"
          >
            <FaChevronRight />
          </Link>
        )}
      </div>
    )
  );
};

export default Paginate;