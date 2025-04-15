import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import RecipeCard from "../../components/RecipeCard";
import { NavLink } from "react-router";
import Pagination from "../../components/Pagination";
import SearchAndFilter from "../../components/SearchAndFilter";
import { Recipe } from "../../types/recipeTypes";
import NoSavedRecipesMesage from "./components/NoSavedRecipesMessage";
import NoResultsMessage from "./components/NoResultsMessage";
import ChatWindow from "../../components/ChatWindow";
import HeroTwoSection from "../../components/HeroTwoSection";
import useSavedRecipesId from "../../hooks/useSavedRecipesId";
import useSavedRecipes from "../../hooks/useSavedRecipes";

const SavedRecipePage = () => {
    const [query, setQuery] = useState("");
    const [cuisine, setCuisine] = useState<string>("");
    const [mealType, setMealType] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState<string>("");
    const [page, setPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const { data: savedRecipesIdData } = useSavedRecipesId();
    const { data: savedRecipesData, isLoading } = useSavedRecipes(
        page,
        debouncedQuery,
        mealType,
        cuisine
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
            setPage(1);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        document.title = "Spoonfed | Saved Recipes";
    }, []);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const clearFilters = () => {
        setQuery("");
        setCuisine("");
        setMealType("");
    };

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <ChatWindow />
            <Header />
            <HeroTwoSection bgImage={"/images/recipe-bg.jpg"}>
                <div className="text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full mb-4">
                        <span className="w-2 h-2 rounded-full bg-secondary-400"></span>
                        <span className="text-sm font-medium">
                            Your Collection
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-dancing-script text-white font-bold mb-3 drop-shadow-md">
                        Your Saved{" "}
                        <span className="text-secondary-400">Recipes</span>
                    </h1>
                    <p className="text-white/90 text-lg max-w-xl mx-auto md:mx-0">
                        Recipes you've bookmarked for easy access. Your personal
                        collection of culinary inspirations.
                    </p>
                </div>
            </HeroTwoSection>

            <div className="container mx-auto px-4 mb-8">
                <SearchAndFilter
                    placeholder="Search your saved recipes..."
                    query={query}
                    setQuery={setQuery}
                    setMealType={setMealType}
                    setCuisine={setCuisine}
                    showFilters={showFilters}
                    toggleFilters={toggleFilters}
                />
            </div>

            <div className="container mx-auto px-4 pb-16">
                {isLoading ? (
                    <div className="flex flex-col items-center py-16">
                        <Loader loading={isLoading} />
                        <p className="text-gray-600 mt-4">
                            Finding your saved recipes...
                        </p>
                    </div>
                ) : savedRecipesData.recipes.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {savedRecipesData.recipes.map((recipe: Recipe) => (
                                <NavLink
                                    to={`/recipe/${recipe._id}`}
                                    className="block h-full"
                                >
                                    <RecipeCard
                                        savedRecipes={savedRecipesIdData}
                                        recipe={recipe}
                                    />
                                </NavLink>
                            ))}
                        </div>

                        {savedRecipesData.pagination.pageCount > 1 && (
                            <div className="mt-10 flex justify-center">
                                <Pagination
                                    setPage={setPage}
                                    pageCount={
                                        savedRecipesData.pagination.pageCount
                                    }
                                    page={page}
                                />
                            </div>
                        )}
                    </>
                ) : query || cuisine || mealType ? (
                    <NoResultsMessage clearFilters={clearFilters} />
                ) : (
                    <NoSavedRecipesMesage />
                )}
            </div>

            <Footer />
        </div>
    );
};

export default SavedRecipePage;
