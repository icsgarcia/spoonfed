import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import RecipeCard from "../../components/RecipeCard";
import { NavLink } from "react-router";
import Pagination from "../../components/Pagination";
import SearchAndFilter from "../../components/SearchAndFilter";
import { Recipe } from "../../types/recipeTypes";
import ChatWindow from "../../components/ChatWindow";
import useSavedRecipesId from "../../hooks/useSavedRecipesId";
import useSavedRecipes from "../../hooks/useSavedRecipes";
import { Spinner } from "@/components/ui/spinner";

const SavedRecipePage = () => {
    const [query, setQuery] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [mealType, setMealType] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [page, setPage] = useState(1);
    const { data: savedRecipesIdData } = useSavedRecipesId();
    const { data: savedRecipesData, isFetching } = useSavedRecipes(
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

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <ChatWindow />
            <Header />

            <div className="container mx-auto px-4">
                <SearchAndFilter
                    query={query}
                    setQuery={setQuery}
                    setMealType={setMealType}
                    setCuisine={setCuisine}
                />

                {isFetching && <Spinner />}
                {savedRecipesData && savedRecipesData.recipes.length > 0 && (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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

                        <div className="mt-8 mb-16">
                            <Pagination
                                setPage={setPage}
                                pageCount={
                                    savedRecipesData.pagination.pageCount
                                }
                                page={page}
                            />
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default SavedRecipePage;
