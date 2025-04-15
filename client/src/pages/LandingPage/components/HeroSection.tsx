import { useState, useEffect } from "react";
import { FaUtensils, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { NavLink } from "react-router";
import { HashLink } from "react-router-hash-link";
import { Recipe } from "../../../types/recipeTypes";
import useFeaturedRecipes from "../../../hooks/useFeaturedRecipes";

const HeroSection = ({ discoverRecipesId }: { discoverRecipesId: string }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { data: featuredRecipesData } = useFeaturedRecipes();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) =>
                prev === featuredRecipesData?.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [featuredRecipesData?.length]);

    const goToNext = () => {
        setCurrentSlide((prev) =>
            prev === featuredRecipesData?.length - 1 ? 0 : prev + 1
        );
    };

    const goToPrev = () => {
        setCurrentSlide((prev) =>
            prev === 0 ? featuredRecipesData?.length - 1 : prev - 1
        );
    };

    return (
        <section className="relative bg-gradient-to-br from-primary-800 to-primary-600 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-food.png')] bg-repeat opacity-30"></div>
            </div>

            <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col lg:flex-row items-center">
                {/* Left content */}
                <div className="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Discover{" "}
                        <span className="font-dancing-script text-secondary-300">
                            Delicious
                        </span>{" "}
                        Recipes
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl mb-8 max-w-lg mx-auto lg:mx-0">
                        Find, save, and create amazing recipes from around the
                        world. Your culinary journey begins here.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <NavLink
                            to="/signup"
                            className="px-8 py-3.5 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg shadow-lg shadow-secondary-500/30 transition-all transform hover:-translate-y-1"
                        >
                            Join Now
                        </NavLink>
                        <HashLink
                            to={`#${discoverRecipesId}`}
                            smooth
                            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg border border-white/30 backdrop-blur-sm transition-all"
                        >
                            Learn More
                        </HashLink>
                    </div>
                </div>

                {/* Image Carousel - Right Side */}
                <div className="lg:w-1/2 relative">
                    <div className="relative rounded-xl overflow-hidden shadow-2xl h-[350px] md:h-[400px]">
                        <div
                            className="relative w-full h-full transition-all duration-500 ease-in-out"
                            style={{
                                height: "100%",
                                width: `${featuredRecipesData?.length * 100}%`,
                                transform: `translateX(-${
                                    currentSlide *
                                    (100 / featuredRecipesData?.length)
                                }%)`,
                            }}
                        >
                            {featuredRecipesData?.map(
                                (recipe: Recipe, index: number) => (
                                    <div
                                        key={index}
                                        className="absolute top-0 h-full"
                                        style={{
                                            width: `${
                                                100 /
                                                featuredRecipesData?.length
                                            }%`,
                                            left: `${
                                                index *
                                                (100 /
                                                    featuredRecipesData?.length)
                                            }%`,
                                        }}
                                    >
                                        <img
                                            src={recipe.image}
                                            alt={recipe.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                                            <div className="flex gap-2 mb-2">
                                                {recipe.tags.map(
                                                    (tag: string) => (
                                                        <span
                                                            key={tag}
                                                            className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
                                                        >
                                                            {tag}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                            <h3 className="text-lg font-bold text-white">
                                                {recipe.name}
                                            </h3>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        <button
                            onClick={goToPrev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
                            aria-label="Previous slide"
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
                            aria-label="Next slide"
                        >
                            <FaChevronRight />
                        </button>

                        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2">
                            {featuredRecipesData?.map(
                                (_: Recipe, index: number) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${
                                            currentSlide === index
                                                ? "bg-white scale-125"
                                                : "bg-white/50"
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                )
                            )}
                        </div>
                    </div>

                    <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 flex items-center gap-3">
                        <div className="bg-primary-100 rounded-full p-3">
                            <FaUtensils className="text-primary-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-800 font-bold">50+</p>
                            <p className="text-gray-500 text-sm">Recipes</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
