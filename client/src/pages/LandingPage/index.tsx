import Newsletter from "../../components/Newsletter";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import LandingHeader from "../../components/LandingHeader";
import CTASection from "./components/CTASection";
import FeaturedRecipesSection from "./components/FeaturedRecipesSection";
import SearchAndFilter from "./components/SearchAndFilter";
import HeroSection from "./components/HeroSection";
import usePublicRecipes from "../../hooks/usePublicRecipes";
import RecipesSection from "./components/RecipesSection";

const LandingPage = () => {
    const discoverRecipesId = "why-spoonfed";
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

    useEffect(() => {
        document.title = "Spoonfed";
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(query);
            setPage(1);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="w-full min-h-screen">
            <LandingHeader />
            <HeroSection discoverRecipesId={discoverRecipesId} />
            <SearchAndFilter
                query={query}
                setQuery={setQuery}
                setMealType={setMealType}
                setCuisine={setCuisine}
            />

            <RecipesSection
                isFetching={isFetching}
                recipes={publicRecipesData?.recipes}
                setPage={setPage}
                pageCount={publicRecipesData?.pagination.pageCount}
                page={page}
                setQuery={setQuery}
                setCuisine={setCuisine}
                setMealType={setMealType}
            />
            <FeaturedRecipesSection discoverRecipesId={discoverRecipesId} />

            <CTASection />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default LandingPage;
