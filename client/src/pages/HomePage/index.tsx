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
import NoRecipesFoundSection from "../../components/NoRecipesFoundSection";
import HeroSection from "../../components/HeroSection";
import { HashLink } from "react-router-hash-link";
import { FaArrowRight, FaBookOpen, FaUtensils } from "react-icons/fa6";
import usePublicRecipes from "../../hooks/usePublicRecipes";
import useSavedRecipesId from "../../hooks/useSavedRecipesId";

const HomePage = () => {
    const discoverRecipesId = "discover-recipes";
    const [query, setQuery] = useState<string>("");
    const [cuisine, setCuisine] = useState<string>("");
    const [mealType, setMealType] = useState<string>("");
    const [showFilters, setShowFilters] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const { data: publicRecipesData, isFetching } = usePublicRecipes(
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

    useEffect(() => {
        document.title = "Spoonfed | Home";
    }, []);

    return (
        <div className="w-full relative bg-gray-50">
            <ChatWindow />
            <Header />
            <HeroSection bgImage={"images/hero-images/hero3-img.jpeg"}>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full mb-6">
                    <span className="w-2 h-2 rounded-full bg-secondary-400"></span>
                    <span className="text-sm font-medium">Welcome Back</span>
                </div>

                <h2 className="font-dancing-script font-bold text-5xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight drop-shadow-md">
                    Ready to Create <br className="hidden sm:inline" />
                    <span className="text-secondary-400">Culinary Magic</span>,
                    Chef?
                </h2>

                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-8">
                    Welcome back to Spoonfed! Dive into your personal dashboard,
                    update your favorite recipes, and explore new dishes crafted
                    just for you. Your next masterpiece awaits!
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6">
                    <HashLink
                        to={`#${discoverRecipesId}`}
                        smooth
                        className="group flex items-center gap-2 bg-secondary-500 hover:bg-secondary-600 text-white py-3 px-6 md:px-8 rounded-full transition-all hover:shadow-lg hover:-translate-y-1"
                    >
                        <FaBookOpen />
                        <span className="font-medium">Discover Recipes</span>
                        <FaArrowRight className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                    </HashLink>

                    <NavLink
                        to={"/my-recipes"}
                        className="group flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 md:px-8 rounded-full transition-all hover:shadow-lg hover:-translate-y-1"
                    >
                        <FaUtensils />
                        <span className="font-medium">My Recipes</span>
                        <FaArrowRight className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                    </NavLink>
                </div>
            </HeroSection>

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
                            placeholder="Search for recipes"
                            query={query}
                            setQuery={setQuery}
                            setMealType={setMealType}
                            setCuisine={setCuisine}
                            showFilters={showFilters}
                            toggleFilters={toggleFilters}
                        />
                    </div>

                    {/* Recipe Grid */}
                    {isFetching ? (
                        <Loader
                            loading={isFetching}
                            text="Searching for recipes..."
                        />
                    ) : publicRecipesData?.recipes.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                                {publicRecipesData?.recipes.map(
                                    (recipe: Recipe) => (
                                        <NavLink to={`/recipe/${recipe._id}`}>
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
                            <div className="mt-12 flex justify-center">
                                <Pagination
                                    setPage={setPage}
                                    pageCount={
                                        publicRecipesData?.pagination.pageCount
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
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;
