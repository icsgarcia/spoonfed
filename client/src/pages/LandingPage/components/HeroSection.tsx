import { FaUtensils } from "react-icons/fa6";
import { NavLink } from "react-router";
import { HashLink } from "react-router-hash-link";
import { Recipe } from "../../../types/recipeTypes";
import useFeaturedRecipes from "../../../hooks/useFeaturedRecipes";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Spinner } from "@/components/ui/spinner";

const HeroSection = ({ discoverRecipesId }: { discoverRecipesId: string }) => {
    const { data: featuredRecipes, isLoading } = useFeaturedRecipes();

    return (
        <section className="pt-24 pb-12 bg-gradient-to-b from-green-50 to-white">
            <div className="container mx-auto px-4 py-8 lg:py-16">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
                    {/* Left content */}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Discover Delicious{" "}
                            <span className="text-green-600">Recipes</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                            Find, save, and create amazing recipes from around
                            the world. Your culinary journey begins here.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <NavLink
                                to="/signup"
                                className="w-full sm:w-auto px-8 py-4 text-white font-semibold rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                            >
                                Join Now
                            </NavLink>
                            <HashLink
                                to={`#${discoverRecipesId}`}
                                smooth
                                className="w-full sm:w-auto px-8 py-4 text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all duration-200"
                            >
                                View Recipes
                            </HashLink>
                        </div>
                    </div>

                    {/* Image Carousel - Right Side */}
                    <div className="w-full lg:w-1/2">
                        <Carousel className="w-full max-w-lg mx-auto">
                            <CarouselContent>
                                {isLoading && (
                                    <div className="flex justify-center items-center h-96">
                                        <Spinner className="size-12 text-green-500" />
                                    </div>
                                )}
                                {featuredRecipes &&
                                    featuredRecipes.map((recipe: Recipe) => (
                                        <CarouselItem key={recipe._id}>
                                            <Card className="border-0 shadow-2xl overflow-hidden">
                                                <CardContent className="p-0">
                                                    <div className="relative">
                                                        <img
                                                            src={recipe.image}
                                                            alt={recipe.name}
                                                            className="w-full h-64 sm:h-80 object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                                            <div className="flex flex-wrap gap-2 mb-3">
                                                                {recipe.tags
                                                                    .slice(0, 3)
                                                                    .map(
                                                                        (
                                                                            tag: string
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    tag
                                                                                }
                                                                                className="px-3 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                                                                            >
                                                                                {
                                                                                    tag
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                            </div>
                                                            <h3 className="text-2xl font-bold text-white">
                                                                {recipe.name}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                        </Carousel>

                        {/* Stats Badge */}
                        <div className="flex items-center gap-4 bg-white rounded-xl shadow-lg p-4 max-w-xs mx-auto mt-6 border border-gray-100">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <FaUtensils className="text-2xl text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    50+
                                </p>
                                <p className="text-sm text-gray-600">
                                    Delicious Recipes
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
