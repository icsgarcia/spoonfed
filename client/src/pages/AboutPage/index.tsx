import { useEffect } from "react";
import Header from "../../components/Header";
import OurStorySection from "./components/OurStorySection";
import OurMissionSection from "./components/OurMissionSection";
import UniqueFeaturesSection from "./components/UniqueFeaturesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import TeamSection from "./components/TeamSection";
import NewsletterSection from "./components/NewsletterSection";
import Footer from "../../components/Footer";
import ChatWindow from "../../components/ChatWindow";
import HeroSection from "../../components/HeroSection";

const AboutPage = () => {
    useEffect(() => {
        document.title = "Spoonfed | About Us";
    }, []);
    return (
        <div className="w-full relative">
            <ChatWindow />
            <Header />
            <HeroSection bgImage={"/images/hero-images/hero-img.jpg"}>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full mb-6">
                    <span className="w-2 h-2 rounded-full bg-secondary-400"></span>
                    <span className="text-sm font-medium">About Spoonfed</span>
                </div>

                <h2 className="font-dancing-script font-bold text-5xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight drop-shadow-md">
                    Welcome to <br className="hidden sm:inline" />
                    <span className="text-secondary-400">
                        Our Food Community
                    </span>
                </h2>

                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-8">
                    At Spoonfed, food is more than just sustenance—it's an
                    experience. Whether you're a passionate home cook or just
                    love discovering new flavors, this is your community!
                </p>
            </HeroSection>
            <OurStorySection />
            <OurMissionSection />
            <UniqueFeaturesSection />
            <TestimonialsSection />
            <TeamSection />
            <NewsletterSection />
            <Footer />
        </div>
    );
};

export default AboutPage;
