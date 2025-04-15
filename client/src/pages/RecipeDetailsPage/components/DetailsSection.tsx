import { FaShareAlt } from "react-icons/fa";
import { FaBookmark, FaClock, FaPrint } from "react-icons/fa6";
import { Recipe } from "../../../types/recipeTypes";

interface DetailsSectionProps {
    recipe: Recipe;
    savedRecipes: string[];
    handlePrint: () => void;
    handleToggleSave: () => void;
}

const DetailsSection = ({
    recipe,
    savedRecipes,
    handlePrint,
    handleToggleSave,
}: DetailsSectionProps) => {
    return (
        <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-4">
                <h3 className="text-xl font-bold mb-4">Recipe Details</h3>

                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-gray-600">Prep Time</span>
                        <span className="font-medium flex items-center gap-1.5">
                            <FaClock className="text-primary-500" />
                            {recipe.prepTimeMinutes} mins
                        </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-gray-600">Cook Time</span>
                        <span className="font-medium flex items-center gap-1.5">
                            <FaClock className="text-primary-500" />
                            {recipe.cookTimeMinutes} mins
                        </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-gray-600">Total Time</span>
                        <span className="font-medium flex items-center gap-1.5">
                            <FaClock className="text-primary-500" />
                            {recipe.prepTimeMinutes +
                                recipe.cookTimeMinutes}{" "}
                            mins
                        </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-gray-600">Servings</span>
                        <span className="font-medium">{recipe.servings}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-gray-600">Calories</span>
                        <span className="font-medium">
                            {recipe.caloriesPerServing || "N/A"} per serving
                        </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-gray-600">Meal Type</span>
                        <div className="flex flex-wrap justify-end gap-1">
                            {recipe.mealType.map((type) => (
                                <span
                                    key={type}
                                    className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full"
                                >
                                    {type}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1.5">
                        {recipe.tags?.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center border-t border-gray-100 pt-4 mt-6">
                    <div className="flex gap-3">
                        <button
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                            onClick={handlePrint}
                        >
                            <FaPrint />
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                            <FaShareAlt />
                        </button>
                        <button
                            className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
                                savedRecipes.includes(recipe._id)
                                    ? "bg-secondary-100 text-secondary-600"
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                            }`}
                            onClick={handleToggleSave}
                        >
                            <FaBookmark />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsSection;
