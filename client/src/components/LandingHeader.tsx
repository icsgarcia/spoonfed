import { NavLink } from "react-router";
import SpoonfedLogo from "/images/spoonfed-logo-removebg-preview.png";
import { FaLeaf, FaUtensils } from "react-icons/fa6";
import { useEffect, useState } from "react";

const LandingHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 w-full py-3 transition-all duration-300 backdrop-blur-sm ${
                isScrolled ? "bg-white/95 shadow-md py-2" : "bg-white/80 py-4"
            }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                    <NavLink
                        to="/"
                        className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                    >
                        <div className="relative">
                            <img
                                src={SpoonfedLogo}
                                alt="Spoonfed Logo"
                                className="w-12 h-12 object-contain"
                            />
                            {!isScrolled && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary-500 rounded-full border-2 border-white animate-pulse"></div>
                            )}
                        </div>
                        <div>
                            <h1 className="font-dancing-script text-3xl font-bold text-primary-800">
                                Spoonfed
                            </h1>
                            <div className="flex items-center gap-1 -mt-1">
                                <span className="text-xs text-primary-600 font-medium tracking-wider">
                                    RECIPE APP
                                </span>
                                <span className="block w-1 h-1 rounded-full bg-secondary-500"></span>
                                <span className="text-xs text-gray-500">
                                    Taste the difference
                                </span>
                            </div>
                        </div>
                    </NavLink>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                        <NavLink
                            to="/login"
                            className="relative overflow-hidden group px-6 py-2 rounded-lg font-medium text-primary-700 border-2 border-primary-500 hover:border-primary-600 transition-all flex items-center justify-center"
                        >
                            <span className="absolute inset-0 w-full h-full bg-primary-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                            <FaUtensils className="mr-2 relative z-10 text-primary-600" />
                            <span className="relative z-10">Log In</span>
                        </NavLink>

                        <NavLink
                            to="/signup"
                            className="px-6 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center"
                        >
                            <FaLeaf className="mr-2 text-secondary-300" />
                            <span>Sign Up</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default LandingHeader;
