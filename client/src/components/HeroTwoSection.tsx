import HeroSVG from "./HeroSVG";
import { ReactNode, useEffect, useState } from "react";

const HeroTwoSection = ({
    children,
    bgImage,
}: {
    children: ReactNode;
    bgImage: string;
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="relative w-full overflow-hidden">
            <div
                style={{ backgroundImage: `url(${bgImage})` }}
                className="absolute inset-0 bg-cover bg-center"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-800/95 to-primary-700/90"></div>
            </div>
            <div className="absolute inset-0 bg-[url('/images/pattern-dots.png')] bg-repeat opacity-10"></div>
            <div className="container relative mx-auto px-4 py-16 z-10">
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

export default HeroTwoSection;
