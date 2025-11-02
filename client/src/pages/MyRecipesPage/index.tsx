import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { NavLink } from "react-router";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import SearchAndFilter from "../../components/SearchAndFilter";
import RecipeCard from "../../components/RecipeCard";
import { Recipe } from "../../types/recipeTypes";
import NoRecipesMessage from "./components/NoRecipesMessage";
import ChatWindow from "../../components/ChatWindow";
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
