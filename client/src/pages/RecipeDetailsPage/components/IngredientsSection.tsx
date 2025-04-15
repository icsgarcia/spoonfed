import { FaCarrot } from "react-icons/fa6";
import { Recipe } from "../../../types/recipeTypes";

const IngredientsSection = ({ recipe }: { recipe: Recipe }) => {
    return (
        <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-primary-100 rounded-full">
                        <FaCarrot className="text-primary-600" />
                    </div>
                    <h2 className="text-xl font-bold">Ingredients</h2>
                </div>

                <ul className="space-y-4">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <div className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-primary-500"></div>
                            <span>{ingredient}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default IngredientsSection;
