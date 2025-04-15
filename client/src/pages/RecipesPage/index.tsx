import { NavLink } from "react-router";
import Footer from "../../components/Footer";
import Pagination from "../../components/Pagination";
import RecipeCard from "../../components/RecipeCard";
import SearchAndFilter from "../../components/SearchAndFilter";
import Header from "../../components/Header";
import ChatWindow from "../../components/ChatWindow";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import HeroTwoSection from "../../components/HeroTwoSection";
import NoRecipesFoundSection from "../../components/NoRecipesFoundSection";
import usePublicRecipes from "../../hooks/usePublicRecipes";
import useSavedRecipesId from "../../hooks/useSavedRecipesId";
import { Recipe } from "../../types/recipeTypes";

const RecipesPage = () => {
    const [query, setQuery] = useState<string>("");
    const [cuisine, setCuisine] = useState<string>("");
    const [mealType, setMealType] = useState<string>("");
    const [showFilters, setShowFilters] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const { data: publicRecipesData, isLoading } = usePublicRecipes(
        page,
        debouncedQuery,
        mealType,
        cuisine
    );
    const { data: savedRecipesIdData } = useSavedRecipesId();

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
            setPage(1);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <ChatWindow />
            <Header />
            <HeroTwoSection bgImage={"/images/recipe-bg.jpg"}>
                <div className="md:max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full mb-4">
                        <span className="w-2 h-2 rounded-full bg-secondary-400"></span>
                        <span className="text-sm font-medium">
                            Explore Recipes
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-dancing-script text-white font-bold mb-3 drop-shadow-md">
                        Discover Delicious{" "}
                        <span className="text-secondary-400">Recipes</span>
                    </h1>

                    <p className="text-white/90 text-lg max-w-xl">
                        Browse our collection of mouth-watering recipes from
                        around the world. Find the perfect dish for any
                        occasion, meal type, or cuisine.
                    </p>
                </div>
            </HeroTwoSection>

            <div className="container mx-auto px-4 mb-24">
                <SearchAndFilter
                    placeholder="Search your recipes..."
                    query={query}
                    setQuery={setQuery}
                    setMealType={setMealType}
                    setCuisine={setCuisine}
                    showFilters={showFilters}
                    toggleFilters={toggleFilters}
                />

                {/* Recipe Cards */}
                {isLoading ? (
                    <div className="flex flex-col items-center py-16">
                        <Loader loading={isLoading} />
                        <p className="text-center mt-4 text-gray-600">
                            Finding delicious recipes...
                        </p>
                    </div>
                ) : publicRecipesData.recipes.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {publicRecipesData.recipes.map((recipe: Recipe) => (
                                <NavLink to={`/recipe/${recipe._id}`}>
                                    <RecipeCard
                                        recipe={recipe}
                                        savedRecipes={savedRecipesIdData}
                                    />
                                </NavLink>
                            ))}
                        </div>
                        <div className="mt-12 flex justify-center">
                            <Pagination
                                setPage={setPage}
                                pageCount={
                                    publicRecipesData.pagination.pageCount
                                }
                                page={page}
                            />
                        </div>
                    </>
                ) : (
                    <NoRecipesFoundSection
                        setQuery={setQuery}
                        setCuisine={setCuisine}
                        setMealType={setMealType}
                    />
                )}
            </div>

            <Footer />
        </div>
    );
};

export default RecipesPage;
