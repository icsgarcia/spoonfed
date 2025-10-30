import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { NavLink } from "react-router";
import { FaArrowRight } from "react-icons/fa6";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import { FaPlusCircle } from "react-icons/fa";
import SearchAndFilter from "../../components/SearchAndFilter";
import RecipeCard from "../../components/RecipeCard";
import { Recipe } from "../../types/recipeTypes";
import NoRecipesMessage from "./components/NoRecipesMessage";
import ChatWindow from "../../components/ChatWindow";
import HeroTwoSection from "../../components/HeroTwoSection";
import useSavedRecipesId from "../../hooks/useSavedRecipesId";
import useCreatedRecipes from "../../hooks/useCreatedRecipes";

const MyRecipesPage = () => {
    const [query, setQuery] = useState("");
    const [cuisine, setCuisine] = useState<string>("");
    const [mealType, setMealType] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState<string>("");
    const [page, setPage] = useState(1);
    const { data: savedRecipeId } = useSavedRecipesId();
    const { data: ownRecipes, isFetching } = useCreatedRecipes(
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
        document.title = "Spoonfed | Own Recipes";
    }, []);

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <ChatWindow />
            <Header />
            <HeroTwoSection bgImage={"/images/recipe-bg.jpg"}>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full mb-4">
                            <span className="w-2 h-2 rounded-full bg-secondary-400"></span>
                            <span className="text-sm font-medium">
                                Your Recipes
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-dancing-script text-white font-bold mb-3 drop-shadow-md">
                            My Recipe{" "}
                            <span className="text-secondary-400">
                                Collection
                            </span>
                        </h1>

                        <p className="text-white/90 text-lg max-w-xl">
                            Manage, edit and organize your personal recipes.
                            Your culinary creations, all in one place.
                        </p>
                    </div>

                    <NavLink
                        to="/create-recipe"
                        className="mt-8 md:mt-0 group flex items-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white py-3 px-6 md:px-8 rounded-full transition-all hover:shadow-lg hover:-translate-y-1"
                    >
                        <FaPlusCircle />
                        <span className="font-medium">Create New Recipe</span>
                        <FaArrowRight className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                    </NavLink>
                </div>
            </HeroTwoSection>

            {/* Content */}
            <div className="container mx-auto px-4 mb-24">
                <SearchAndFilter
                    title="Search Your Recipes"
                    query={query}
                    setQuery={setQuery}
                    setMealType={setMealType}
                    setCuisine={setCuisine}
                />

                {/* Recipe Cards */}
                {isFetching ? (
                    <Loader
                        loading={isFetching}
                        text="Searching for your recipes..."
                    />
                ) : ownRecipes.recipes.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {ownRecipes.recipes.map((recipe: Recipe) => (
                                <NavLink
                                    key={recipe._id}
                                    to={`/recipe/${recipe._id}`}
                                >
                                    <RecipeCard
                                        recipe={recipe}
                                        savedRecipes={savedRecipeId}
                                    />
                                </NavLink>
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center">
                            <Pagination
                                setPage={setPage}
                                pageCount={ownRecipes.pagination.pageCount}
                                page={page}
                            />
                        </div>
                    </>
                ) : (
                    <NoRecipesMessage />
                )}
            </div>

            <Footer />
        </div>
    );
};

export default MyRecipesPage;
