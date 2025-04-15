import { FaClock } from "react-icons/fa6";
import HeartButton from "./HeartButton";
import { NavLink } from "react-router";
import { Recipe } from "../types/recipeTypes";
import { useAuth } from "../context/AuthProvider";

interface RecipeCardProps {
    recipe: Recipe;
    savedRecipes?: string[];
}

const RecipeCard = ({ recipe, savedRecipes }: RecipeCardProps) => {
    const { currentUser } = useAuth();
    return (
        <div
            key={recipe._id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
        >
            <div className="relative h-48">
                <img
                    src={recipe.image || "/images/recipe-placeholder.jpg"}
                    alt={recipe.name}
                    className="w-full h-full object-cover "
                    onError={(e) => {
                        e.currentTarget.src = "/images/recipe-placeholder.jpg";
                    }}
                />
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-2 left-2">
                    <span className="bg-white/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full text-primary-600 font-medium flex items-center gap-1">
                        <FaClock className="text-primary-500" />
                        {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                    </span>
                </div>

                {currentUser && (
                    <HeartButton
                        recipeId={recipe._id}
                        savedRecipes={savedRecipes}
                    />
                )}
            </div>
            <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-1">
                    {recipe.name}
                </h3>
                <div className="flex flex-wrap gap-1 mb-3">
                    {recipe.tags?.slice(0, 3).map((tag) => (
                        <span
                            key={tag}
                            className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                        {recipe.difficulty || "Easy"}
                    </span>
                    <NavLink
                        to={`/recipe/${recipe._id}`}
                        className="text-primary-600 text-sm font-medium hover:text-primary-700"
                    >
                        View Recipe →
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
