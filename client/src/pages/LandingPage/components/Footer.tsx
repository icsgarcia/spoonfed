import { FaGithub, FaTwitter, FaLinkedin, FaHeart } from "react-icons/fa";

function Footer() {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Main Content */}
                    <div className="flex flex-col items-center gap-6 pb-8">
                        {/* Brand */}
                        <div className="text-center">
                            <h3 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                                Spoonfed
                            </h3>
                            <p className="text-gray-400 text-sm sm:text-base max-w-md">
                                Discover delicious recipes from around the world
                            </p>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="p-3 text-gray-400 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-200 transform hover:-translate-y-1"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-3 text-gray-400 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-200 transform hover:-translate-y-1"
                                aria-label="GitHub"
                            >
                                <FaGithub className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-3 text-gray-400 hover:text-white hover:bg-green-600 rounded-lg transition-all duration-200 transform hover:-translate-y-1"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-center pt-8 border-t border-gray-800">
                        <p className="text-gray-400 text-sm flex items-center justify-center gap-2 flex-wrap">
                            <span>© 2025 Spoonfed. Made with</span>
                            <FaHeart className="text-red-500 animate-pulse" />
                            <span>for food lovers</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
