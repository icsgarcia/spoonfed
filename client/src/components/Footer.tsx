import { NavLink } from "react-router";
import { FaGithub, FaTwitter, FaLinkedin, FaHeart } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Main Content */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b border-gray-800">
                        {/* Brand */}
                        <div className="text-center md:text-left">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                                Spoonfed
                            </h3>
                            <p className="text-gray-400 text-sm mt-1">
                                Your recipe companion
                            </p>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex flex-wrap justify-center gap-6 text-sm">
                            <NavLink
                                to="/home"
                                className="text-gray-400 hover:text-green-500 transition-colors"
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/recipes"
                                className="text-gray-400 hover:text-green-500 transition-colors"
                            >
                                All Recipes
                            </NavLink>
                            <NavLink
                                to="/my-recipes"
                                className="text-gray-400 hover:text-green-500 transition-colors"
                            >
                                My Recipes
                            </NavLink>
                            <NavLink
                                to="/saved-recipes"
                                className="text-gray-400 hover:text-green-500 transition-colors"
                            >
                                Saved Recipes
                            </NavLink>
                        </nav>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-green-500 transition-colors"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-green-500 transition-colors"
                                aria-label="GitHub"
                            >
                                <FaGithub className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-green-500 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="pt-6 text-center">
                        <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
                            <span>© 2025 Spoonfed. Made with</span>
                            <FaHeart className="text-red-500" />
                            <span>for food lovers</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
