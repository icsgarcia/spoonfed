import { FaClock, FaUtensils } from "react-icons/fa6";
import { NavLink } from "react-router";
import { Recipe } from "../../types/recipeTypes";
import useFeaturedRecipes from "../../hooks/useFeaturedRecipes";
import NoFeaturedRecipeSection from "./components/NoFeaturedRecipeSection";
import Loader from "../../components/Loader";

const FeaturedRecipeSection = () => {
    const { data: featuredRecipesData, isLoading } = useFeaturedRecipes();

    if (isLoading) {
        return <Loader loading={isLoading} />;
    }
    return featuredRecipesData ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-xl overflow-hidden shadow-lg h-[500px] relative group">
                <NavLink
                    to={`/recipe/${featuredRecipesData[0]?._id}`}
                    className="text-white/90 hover:text-white rounded-lg transition-colors"
                >
                    <img
                        src={
                            featuredRecipesData[0]?.image ||
                            "/images/recipe-placeholder.jpg"
                        }
                        alt={featuredRecipesData[0]?.name || "Featured recipe"}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                            e.currentTarget.src =
                                "/images/recipe-placeholder.jpg";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                        <div className="flex gap-2 mb-3">
                            {featuredRecipesData[0]?.tags
                                ?.slice(0, 3)
                                .map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="bg-secondary-500 text-white text-xs px-2 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                            {featuredRecipesData[0]?.name || "Featured Recipe"}
                        </h3>
                        <p className="text-white/80 line-clamp-2 mb-3">
                            {featuredRecipesData[0]?.description ||
                                "Delicious recipe"}
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-white/90 text-sm">
                                <FaClock />
                                <span>
                                    {(featuredRecipesData[0]?.prepTimeMinutes ||
                                        0) +
                                        (featuredRecipesData[0]
                                            ?.cookTimeMinutes || 0)}{" "}
                                    min
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-white/90 text-sm">
                                <FaUtensils />
                                <span>
                                    {featuredRecipesData[0]?.difficulty ||
                                        "Easy"}
                                </span>
                            </div>
                        </div>
                        View Recipe <span className="text-xs">→</span>
                    </div>
                </NavLink>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
                {featuredRecipesData
                    .slice(1, 4)
                    .map((recipe: Recipe, index: number) => (
                        <div
                            key={recipe._id || index}
                            className="rounded-xl overflow-hidden shadow-md h-[150px] relative group"
                        >
                            <NavLink
                                to={`/recipe/${recipe?._id}`}
                                className="text-white/90 text-xs hover:text-white transition-colors"
                            >
                                <img
                                    src={
                                        recipe?.image ||
                                        "/images/recipe-placeholder.jpg"
                                    }
                                    alt={
                                        recipe?.name ||
                                        `Featured recipe ${index + 2}`
                                    }
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "/images/recipe-placeholder.jpg";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-4">
                                    <div>
                                        <span className="text-white/80 text-xs bg-primary-600 px-2 py-1 rounded-full mb-2 inline-block">
                                            {recipe?.cuisine || "Featured"}
                                        </span>
                                        <h3 className="text-lg font-bold text-white mb-1">
                                            {recipe?.name ||
                                                `Featured Recipe ${index + 2}`}
                                        </h3>
                                        View Recipe{" "}
                                        <span className="text-xs">→</span>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))}
            </div>
        </div>
    ) : (
        <NoFeaturedRecipeSection />
    );
};

export default FeaturedRecipeSection;
