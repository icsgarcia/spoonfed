import { Dispatch, SetStateAction } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface NoRecipesFoundSectionProps {
    setQuery: Dispatch<SetStateAction<string>>;
    setCuisine: Dispatch<SetStateAction<string>>;
    setMealType: Dispatch<SetStateAction<string>>;
}

const NoRecipesFoundSection = ({
    setQuery,
    setCuisine,
    setMealType,
}: NoRecipesFoundSectionProps) => {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gray-100 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaMagnifyingGlass className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">
                No recipes found
            </h3>
            <p className="text-gray-600 mb-6">
                Try adjusting your search or filters
            </p>
            <button
                onClick={() => {
                    setQuery("");
                    setCuisine("");
                    setMealType("");
                }}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
                Clear All Filters
            </button>
        </div>
    );
};

export default NoRecipesFoundSection;
