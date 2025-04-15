import { FaUtensils } from "react-icons/fa6";

const NoFeaturedRecipeSection = () => {
    return (
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 text-center">
            <div className="w-16 h-16 bg-gray-100 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaUtensils className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">
                Featured recipes coming soon
            </h3>
            <p className="text-gray-600">
                Our chefs are preparing something special for you
            </p>
        </div>
    );
};

export default NoFeaturedRecipeSection;
