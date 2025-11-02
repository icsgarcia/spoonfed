import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import RecipeCard from "../../components/RecipeCard";
import { Loader } from "../../components/Loader";
import Pagination from "../../components/Pagination";
import { NavLink } from "react-router";
import SearchAndFilter from "../../components/SearchAndFilter";
import { Recipe } from "../../types/recipeTypes";
import ChatWindow from "../../components/ChatWindow";
import FeaturedRecipeSection from "./FeaturedRecipeSection";
import usePublicRecipes from "../../hooks/usePublicRecipes";
import useSavedRecipesId from "../../hooks/useSavedRecipesId";

const HomePage = () => {
    const discoverRecipesId = "discover-recipes";
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

    useEffect(() => {
        document.title = "Spoonfed | Home";
    }, []);

    return (
        <div className="w-full relative bg-gray-50">
            <ChatWindow />
            <Header />

            {/* Featured Recipes Section */}
            <section className="bg-white py-12 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-12">
                        <h2 className="text-center font-dancing-script font-bold text-5xl mb-2">
                            Featured Recipes
                        </h2>
                        <p className="text-center text-gray-600 max-w-xl mx-auto">
                            Discover our hand-picked selection of delicious
                            recipes that our community loves
                        </p>
                    </div>
                    <FeaturedRecipeSection />
                </div>
            </section>

            {/* All Recipes Section with Search */}
            <section className="bg-primary-50 py-16" id={discoverRecipesId}>
                <div className="container mx-auto px-4">
                    <div className="mb-12">
                        <h2 className="text-center font-dancing-script font-bold text-5xl mb-2">
                            All Recipes
                        </h2>
                        <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
                            Explore our complete collection of delicious recipes
                        </p>

                        {/* Search and Filter */}
                        <SearchAndFilter
                            query={query}
                            setQuery={setQuery}
                            setMealType={setMealType}
                            setCuisine={setCuisine}
                        />
                    </div>

                    {/* Recipe Grid */}
                    {isFetching && (
                        <Loader
                            loading={isFetching}
                            text="Searching for recipes..."
                        />
                    )}
                    {publicRecipesData &&
                        publicRecipesData.recipes.length > 0 && (
                            <div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                                    {publicRecipesData?.recipes.map(
                                        (recipe: Recipe) => (
                                            <NavLink
                                                to={`/recipe/${recipe._id}`}
                                            >
                                                <RecipeCard
                                                    recipe={recipe}
                                                    savedRecipes={
                                                        savedRecipesIdData
                                                    }
                                                />
                                            </NavLink>
                                        )
                                    )}
                                </div>
                                <div>
                                    <Pagination
                                        setPage={setPage}
                                        pageCount={
                                            publicRecipesData?.pagination
                                                .pageCount
                                        }
                                        page={page}
                                    />
                                </div>
                            </div>
                        )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;
