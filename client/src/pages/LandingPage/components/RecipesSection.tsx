import { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router";
import Pagination from "../../../components/Pagination";
import { Recipe } from "../../../types/recipeTypes";
import RecipeCard from "../../../components/RecipeCard";
import NoRecipesFoundSection from "../../../components/NoRecipesFoundSection";
import { Spinner } from "@/components/ui/spinner";

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
        <section className="">
            <div className="px-4 mx-auto">
                {isFetching && <Spinner />}
                {recipes && recipes.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                            {recipes.map((recipe) => (
                                <NavLink
                                    key={recipe._id}
                                    to={`/recipe/${recipe._id}`}
                                    className=""
                                >
                                    <RecipeCard recipe={recipe} />
                                </NavLink>
                            ))}
                        </div>

                        {pageCount > 1 && (
                            <div className="">
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
