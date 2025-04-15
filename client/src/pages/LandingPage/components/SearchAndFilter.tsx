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
        <section className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-xl shadow-lg p-6 -mt-8 lg:-mt-16 relative z-10 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Find Your Perfect Recipe
                </h2>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="flex border border-gray-300 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search for recipes..."
                                className="focus:outline-none w-full py-3 px-4"
                            />
                            <div className="flex items-center px-4 bg-primary-50 text-primary-600 border-l border-gray-300">
                                <FaMagnifyingGlass />
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-60">
                        <MealTypeSelect setMealType={setMealType} />
                    </div>

                    <div className="w-full md:w-60">
                        <CuisineSelect setCuisine={setCuisine} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SearchAndFilter;
