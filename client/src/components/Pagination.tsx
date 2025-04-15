import { Dispatch, SetStateAction } from "react";
import {
    FaAnglesLeft,
    FaAnglesRight,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa6";

interface PaginationProps {
    page: number;
    pageCount: number;
    setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ setPage, pageCount, page }: PaginationProps) => {
    const handleFirst = () => {
        setPage(1);
    };

    const handleLast = () => {
        setPage(pageCount);
    };

    const handlePrevious = () => {
        setPage((prev) => {
            if (prev === 1) return prev;
            return prev - 1;
        });
    };
    const handleNext = () => {
        setPage((prev) => {
            if (prev === pageCount) return prev;
            return prev + 1;
        });
    };

    const generatePages = () => {
        let pages = [];

        pages.push(1);

        if (pageCount <= 7) {
            for (let i = 2; i < pageCount; i++) {
                pages.push(i);
            }
        } else {
            if (page > 3) {
                pages.push("ellipsis-start");
            }

            const startPage = Math.max(2, page - 1);
            const endPage = Math.min(pageCount - 1, page + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            if (page < pageCount - 2) {
                pages.push("ellipsis-end");
            }
        }

        if (pageCount > 1) {
            pages.push(pageCount);
        }

        return pages;
    };

    if (pageCount <= 1) return null;

    return (
        <nav aria-label="Pagination" className="flex justify-center py-8">
            <div className="inline-flex items-center gap-2 rounded-lg bg-white shadow-sm">
                <button
                    onClick={handleFirst}
                    disabled={page === 1}
                    aria-label="Go to first page"
                    className="h-10 w-10 flex items-center justify-center rounded-l-lg text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:cursor-not-allowed"
                >
                    <FaAnglesLeft className="text-sm" />
                </button>

                <button
                    onClick={handlePrevious}
                    disabled={page === 1}
                    aria-label="Go to previous page"
                    className="h-10 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:cursor-not-allowed"
                >
                    <FaChevronLeft className="text-sm" />
                </button>

                <div className="border-l border-r border-gray-200 px-2 flex items-center">
                    {generatePages().map((pageNum, index) => {
                        if (
                            pageNum === "ellipsis-start" ||
                            pageNum === "ellipsis-end"
                        ) {
                            return (
                                <span
                                    key={`${pageNum}-${index}`}
                                    className="h-10 w-8 flex items-center justify-center text-gray-400"
                                >
                                    &hellip;
                                </span>
                            );
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => setPage(pageNum as number)}
                                aria-current={
                                    page === pageNum ? "page" : undefined
                                }
                                aria-label={`Page ${pageNum}`}
                                className={`h-10 w-10 flex items-center justify-center rounded-md mx-0.5 font-medium transition-all ${
                                    page === pageNum
                                        ? "bg-primary-600 text-white shadow-sm"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-primary-600"
                                }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={handleNext}
                    disabled={page === pageCount}
                    aria-label="Go to next page"
                    className="h-10 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:cursor-not-allowed"
                >
                    <FaChevronRight className="text-sm" />
                </button>

                <button
                    onClick={handleLast}
                    disabled={page === pageCount}
                    aria-label="Go to last page"
                    className="h-10 w-10 flex items-center justify-center rounded-r-lg text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:cursor-not-allowed"
                >
                    <FaAnglesRight className="text-sm" />
                </button>
            </div>
        </nav>
    );
};

export default Pagination;
