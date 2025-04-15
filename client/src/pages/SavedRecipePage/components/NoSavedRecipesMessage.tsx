import { FaHeart, FaRegBookmark } from "react-icons/fa6";
import { NavLink } from "react-router";

const NoSavedRecipesMessage = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 bg-secondary-100 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaRegBookmark className="text-secondary-500 text-2xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
                No saved recipes yet
            </h3>
            <p className="text-gray-600 mb-6">
                Start saving recipes you love by clicking the bookmark icon on
                any recipe
            </p>
            <NavLink
                to="/home"
                className="bg-primary-600 text-white px-5 py-2.5 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center gap-2"
            >
                <FaHeart />
                Discover Recipes
            </NavLink>
        </div>
    );
};

export default NoSavedRecipesMessage;
