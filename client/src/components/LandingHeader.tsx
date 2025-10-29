import SpoonfedLogo from "/images/spoonfed-logo-removebg-preview.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { NavLink } from "react-router";

const LandingHeader = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
                isScrolled
                    ? "bg-white shadow-lg py-2"
                    : "bg-white/95 backdrop-blur-sm py-4"
            }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <NavLink
                        to="/"
                        className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity"
                        onClick={closeMobileMenu}
                    >
                        <div className="relative">
                            <img
                                src={SpoonfedLogo}
                                alt="Spoonfed Logo"
                                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">
                                Spoonfed
                            </h1>
                            <p className="text-xs text-gray-500 -mt-0.5">
                                Fresh recipes daily
                            </p>
                        </div>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-4">
                        <NavLink
                            to="/login"
                            className="px-6 py-2.5 text-gray-700 font-medium rounded-lg border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all duration-200"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className="px-6 py-2.5 text-white font-medium rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Sign Up
                        </NavLink>
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? (
                            <FaTimes className="w-6 h-6" />
                        ) : (
                            <FaBars className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen
                            ? "max-h-48 opacity-100 mt-4"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="flex flex-col gap-3 py-4 border-t border-gray-200">
                        <NavLink
                            to="/login"
                            onClick={closeMobileMenu}
                            className="w-full px-6 py-3 text-center text-gray-700 font-medium rounded-lg border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all duration-200"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/signup"
                            onClick={closeMobileMenu}
                            className="w-full px-6 py-3 text-center text-white font-medium rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            Sign Up
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default LandingHeader;
