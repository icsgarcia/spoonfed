import { FaMagnifyingGlass } from "react-icons/fa6";
import MealTypeSelect from "../../../components/MealTypeSelect";
import CuisineSelect from "../../../components/CuisineSelect";
import { Dispatch, SetStateAction } from "react";

interface SearchAndFilterProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    setMealType: Dispatch<SetStateAction<string>>;
    setCuisine: Dispatch<SetStateAction<string>>;
}

const SearchAndFilter = ({
    query,
    setQuery,
    setMealType,
    setCuisine,
}: SearchAndFilterProps) => {
    return (
        <section className="bg-white py-8" id="why-spoonfed">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-xl p-6 sm:p-8 border border-green-100">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                        Find Your Perfect Recipe
                    </h2>

                    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
                        {/* Search Input */}
                        <div className="w-full lg:flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search for recipes..."
                                    className="w-full pl-4 pr-12 py-3.5 text-gray-700 bg-white border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaMagnifyingGlass className="w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto lg:min-w-[400px]">
                            <div className="w-full sm:flex-1">
                                <MealTypeSelect setMealType={setMealType} />
                            </div>
                            <div className="w-full sm:flex-1">
                                <CuisineSelect setCuisine={setCuisine} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SearchAndFilter;
