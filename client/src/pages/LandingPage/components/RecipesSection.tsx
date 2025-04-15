import { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import { Recipe } from "../../../types/recipeTypes";
import RecipeCard from "../../../components/RecipeCard";
import NoRecipesFoundSection from "../../../components/NoRecipesFoundSection";

interface RecipesSectionProps {
    isLoading: boolean;
    recipes: Recipe[];
    pageCount: number;
    page: number;
    setQuery: Dispatch<SetStateAction<string>>;
    setCuisine: Dispatch<SetStateAction<string>>;
    setMealType: Dispatch<SetStateAction<string>>;
    setPage: Dispatch<SetStateAction<number>>;
}

const RecipesSection = ({
    isLoading,
    recipes,
    pageCount,
    page,
    setQuery,
    setCuisine,
    setMealType,
    setPage,
}: RecipesSectionProps) => {
    return (
        <section className="container mx-auto px-4 py-4">
            {isLoading ? (
                <div className="flex flex-col items-center py-12">
                    <Loader loading={isLoading} />
                    <p className="text-center mt-4 text-gray-600">
                        Finding delicious recipes...
                    </p>
                </div>
            ) : recipes.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {recipes.map((recipe) => (
                            <NavLink to={`/recipe/${recipe._id}`}>
                                <RecipeCard recipe={recipe} />
                            </NavLink>
                        ))}
                    </div>

                    <div className="mt-12">
                        <Pagination
                            setPage={setPage}
                            pageCount={pageCount}
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
        </section>
    );
};

export default RecipesSection;
