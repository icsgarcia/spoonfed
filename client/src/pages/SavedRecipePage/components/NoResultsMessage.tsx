import { FaMagnifyingGlass } from "react-icons/fa6";

const NoResultsMessage = ({ clearFilters }: { clearFilters: () => void }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 bg-secondary-100 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaMagnifyingGlass className="text-secondary-500 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
                No matching recipes found
            </h3>
            <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters
            </p>
            <button
                onClick={clearFilters}
                className="bg-primary-600 text-white px-5 py-2.5 rounded-lg hover:bg-primary-700 transition-colors"
            >
                Clear Filters
            </button>
        </div>
    );
};

export default NoResultsMessage;
