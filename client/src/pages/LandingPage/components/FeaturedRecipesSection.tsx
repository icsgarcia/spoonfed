import { FaHeart, FaLeaf, FaUtensils } from "react-icons/fa6";

const FeaturedRecipesSection = ({
    discoverRecipesId,
}: {
    discoverRecipesId: string;
}) => {
    return (
        <section
            aria-label="Featured Recipes"
            id={discoverRecipesId}
            className="container mx-auto px-4 py-20 bg-primary-50"
        >
            <h2 className="text-center font-dancing-script font-bold text-5xl mb-2">
                Why Spoonfed?
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-lg mx-auto">
                The ultimate platform for food enthusiasts
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <FaUtensils className="text-primary-600 text-xl" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Diverse Recipes</h3>
                    <p className="text-gray-600">
                        Thousands of recipes from cuisines around the world to
                        satisfy any craving
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                        <FaLeaf className="text-secondary-600 text-xl" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Dietary Options</h3>
                    <p className="text-gray-600">
                        Filter recipes by dietary needs including vegetarian,
                        vegan, gluten-free and more
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                        <FaHeart className="text-primary-600 text-xl" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Save Favorites</h3>
                    <p className="text-gray-600">
                        Create your personal collection of favorite recipes to
                        access anytime
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FeaturedRecipesSection;
