import { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router";
import Loader from "../../../components/Loader";
import Pagination from "../../../components/Pagination";
import { Recipe } from "../../../types/recipeTypes";
import RecipeCard from "../../../components/RecipeCard";
import NoRecipesFoundSection from "../../../components/NoRecipesFoundSection";

interface RecipesSectionProps {
    isFetching: boolean;
    recipes: Recipe[];
    pageCount: number;
    page: number;
    setQuery: Dispatch<SetStateAction<string>>;
    setCuisine: Dispatch<SetStateAction<string>>;
    setMealType: Dispatch<SetStateAction<string>>;
    setPage: Dispatch<SetStateAction<number>>;
}

const RecipesSection = ({
    isFetching,
    recipes,
    pageCount,
    page,
    setQuery,
    setCuisine,
    setMealType,
    setPage,
}: RecipesSectionProps) => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {isFetching ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <Loader
                            loading={isFetching}
                            text="Searching for recipes..."
                        />
                    </div>
                ) : recipes.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                            {recipes.map((recipe) => (
                                <NavLink
                                    key={recipe._id}
                                    to={`/recipe/${recipe._id}`}
                                    className="transform hover:-translate-y-2 transition-transform duration-300"
                                >
                                    <RecipeCard recipe={recipe} />
                                </NavLink>
                            ))}
                        </div>

                        {pageCount > 1 && (
                            <div className="mt-12 flex justify-center">
                                <Pagination
                                    setPage={setPage}
                                    pageCount={pageCount}
                                    page={page}
                                />
                            </div>
                        )}
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
    );
};

export default RecipesSection;
