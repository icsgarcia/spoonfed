import { FaPlusCircle, FaUtensils } from "react-icons/fa";
import { NavLink } from "react-router";

const NoRecipesMessage = () => {
    return (
        <div className="text-center py-16 px-4 bg-white rounded-xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
            <div className="bg-primary-100 w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-6">
                <FaUtensils className="text-3xl text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No recipes yet
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                You haven't created any recipes yet. Start building your
                collection by creating your first recipe.
            </p>
            <NavLink
                to="/create-recipe"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-primary-700 transition-colors"
            >
                <FaPlusCircle />
                Create Your First Recipe
            </NavLink>
        </div>
    );
};

export default NoRecipesMessage;
