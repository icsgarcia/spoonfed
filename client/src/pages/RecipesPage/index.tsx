import { NavLink } from "react-router";
import Footer from "../../components/Footer";
import Pagination from "../../components/Pagination";
import RecipeCard from "../../components/RecipeCard";
import SearchAndFilter from "../../components/SearchAndFilter";
import Header from "../../components/Header";
import ChatWindow from "../../components/ChatWindow";
import { useEffect, useState } from "react";
import usePublicRecipes from "../../hooks/usePublicRecipes";
import useSavedRecipesId from "../../hooks/useSavedRecipesId";
import { Recipe } from "../../types/recipeTypes";
import { Spinner } from "@/components/ui/spinner";

const RecipesPage = () => {
    const [query, setQuery] = useState<string>("");
    const [cuisine, setCuisine] = useState<string>("");
    const [mealType, setMealType] = useState<string>("");
    const [debouncedQuery, setDebouncedQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const { data: publicRecipesData, isFetching } = usePublicRecipes(
        page,
        debouncedQuery,
        mealType,
        cuisine
    );
    const { data: savedRecipesIdData } = useSavedRecipesId();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
            setPage(1);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="w-full min-h-screen">
            <ChatWindow />
            <Header />

            <div className="container mx-auto px-4">
                <SearchAndFilter
                    title="Search your recipes..."
                    query={query}
                    setQuery={setQuery}
                    setMealType={setMealType}
                    setCuisine={setCuisine}
                />

                {isFetching && <Spinner />}

                {/* Recipe Cards */}
                {publicRecipesData && publicRecipesData.recipes.length > 0 && (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {publicRecipesData.recipes.map((recipe: Recipe) => (
                                <NavLink to={`/recipe/${recipe._id}`}>
                                    <RecipeCard
                                        recipe={recipe}
                                        savedRecipes={savedRecipesIdData}
                                    />
                                </NavLink>
                            ))}
                        </div>
                        <div className="mt-8 mb-16">
                            <Pagination
                                setPage={setPage}
                                pageCount={
                                    publicRecipesData.pagination.pageCount
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

export default RecipesPage;
