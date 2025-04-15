import { FaUtensils } from "react-icons/fa6";
import { Recipe } from "../../../types/recipeTypes";

const InstructionsSection = ({ recipe }: { recipe: Recipe }) => {
    return (
        <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-6">
                    <div className="p-2 bg-primary-100 rounded-full">
                        <FaUtensils className="text-primary-600" />
                    </div>
                    <h2 className="text-xl font-bold">Instructions</h2>
                </div>

                <ol className="space-y-6">
                    {recipe.instructions.map((instruction, index) => (
                        <li key={index} className="relative pl-10">
                            <div className="absolute left-0 top-0 w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center">
                                <span className="text-primary-700 text-sm font-medium">
                                    {index + 1}
                                </span>
                            </div>
                            <p>{instruction}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default InstructionsSection;
