import { ReactNode, useEffect, useState } from "react";
import HeroSVG from "./HeroSVG";

const HeroSection = ({
    bgImage,
    children,
}: {
    bgImage: string;
    children: ReactNode;
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="relative w-full min-h-[70vh] md:min-h-[65vh] flex items-center justify-center overflow-hidden">
            <div
                style={{ backgroundImage: `url(${bgImage})` }}
                className="absolute inset-0 bg-cover bg-center z-[5]"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
            </div>

            <div className="absolute inset-0 bg-[url('/images/pattern-dots.png')] bg-repeat opacity-10"></div>

            <div className="relative max-w-5xl mx-auto px-6 py-16 text-center z-[15]">
                <div
                    className={`transition-all duration-1000 ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                >
                    {children}
                </div>
            </div>

            <HeroSVG />
        </div>
    );
};

export default HeroSection;
