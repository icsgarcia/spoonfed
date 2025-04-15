import { Dispatch, SetStateAction } from "react";
import { FaFilter, FaMagnifyingGlass } from "react-icons/fa6";
import MealTypeSelect from "./MealTypeSelect";
import CuisineSelect from "./CuisineSelect";

interface SearchAndFilterProps {
    placeholder: string;
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    setMealType: Dispatch<SetStateAction<string>>;
    setCuisine: Dispatch<SetStateAction<string>>;
    showFilters: boolean;
    toggleFilters: () => void;
}

const SearchAndFilter = ({
    placeholder,
    query,
    setQuery,
    setMealType,
    setCuisine,
    showFilters,
    toggleFilters,
}: SearchAndFilterProps) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={placeholder}
                            className="w-full py-3 px-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                            <FaMagnifyingGlass />
                        </div>
                    </div>
                </div>
                <button
                    onClick={toggleFilters}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
                >
                    <FaFilter className="text-primary-600" />
                    {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
            </div>

            {showFilters && (
                <div className="pt-4 mt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Filter by Meal Type
                        </label>
                        <MealTypeSelect setMealType={setMealType} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Filter by Cuisine
                        </label>
                        <CuisineSelect setCuisine={setCuisine} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchAndFilter;
