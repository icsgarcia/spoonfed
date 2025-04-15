import { FaUtensils } from "react-icons/fa6";

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-br from-primary-700 to-primary-800 py-12 px-4">
            <div className="container mx-auto text-center">
                <div className="mb-2 inline-flex items-center justify-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full backdrop-blur-sm">
                    <FaUtensils className="text-secondary-300" />
                    <span>Recipe Creator</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Create Your Recipe
                </h1>
                <p className="text-white/80 max-w-xl mx-auto">
                    Share your culinary masterpiece with the Spoonfed community
                </p>
            </div>
        </section>
    );
};

export default HeroSection;
