import {
    FaArrowUp,
    FaEnvelope,
    FaFacebook,
    FaInstagram,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";
import { Link } from "react-router";
import SpoonfedLogo from "/images/spoonfed-logo-removebg-preview.png";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="w-full bg-gradient-to-b from-primary-900 to-primary-900 text-white relative print:hidden">
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform translate-y-[-99%]">
                <svg
                    className="relative block w-full h-[30px]"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        className="fill-primary-900"
                    ></path>
                </svg>
            </div>

            <button
                onClick={scrollToTop}
                className="bg-secondary-500 hover:bg-secondary-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all hover:-translate-y-1 absolute right-6 top-0 transform -translate-y-1/2 z-10"
                aria-label="Scroll to top"
            >
                <FaArrowUp />
            </button>

            <div className="container mx-auto px-4 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {/* Brand Section */}
                    <div>
                        <Link to="/home" className="flex items-center mb-6">
                            <img
                                src={SpoonfedLogo}
                                alt="spoonfed-logo"
                                className="w-16 h-16"
                            />
                            <p className="text-3xl font-dancing-script ml-2">
                                Spoonfed
                            </p>
                        </Link>
                        <p className="text-gray-300 mb-6">
                            Discover delicious recipes and cooking inspirations
                            from our community of passionate food lovers.
                        </p>
                        <div className="flex space-x-5">
                            <Link
                                to=""
                                data-testid="FaFacebook"
                                className="block transition-colors hover:text-secondary-400"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={20} />
                            </Link>
                            <Link
                                to=""
                                data-testid="FaInstagram"
                                className="block transition-colors hover:text-secondary-400"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={20} />
                            </Link>
                            <Link
                                to=""
                                data-testid="FaXTwitter"
                                className="block transition-colors hover:text-secondary-400"
                                aria-label="Twitter"
                            >
                                <FaXTwitter size={20} />
                            </Link>
                            <Link
                                to=""
                                data-testid="FaYoutube"
                                className="block transition-colors hover:text-secondary-400"
                                aria-label="Youtube"
                            >
                                <FaYoutube size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="mx-auto">
                        <h3 className="text-lg font-bold mb-6 relative">
                            Quick Links
                            <span className="absolute bottom-[-8px] left-0 h-1 w-10 bg-secondary-500 rounded-full"></span>
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/home"
                                    className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 flex items-center group"
                                >
                                    <span className="h-1.5 w-1.5 bg-secondary-500 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 flex items-center group"
                                >
                                    <span className="h-1.5 w-1.5 bg-secondary-500 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/my-recipes"
                                    className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 flex items-center group"
                                >
                                    <span className="h-1.5 w-1.5 bg-secondary-500 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                                    My Recipes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/saved-recipes"
                                    className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 flex items-center group"
                                >
                                    <span className="h-1.5 w-1.5 bg-secondary-500 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                                    Saved Recipes
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile/personal-info"
                                    className="text-gray-300 hover:text-white transition-colors hover:translate-x-1 flex items-center group"
                                >
                                    <span className="h-1.5 w-1.5 bg-secondary-500 rounded-full mr-2 group-hover:w-3 transition-all"></span>
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 relative">
                            Newsletter
                            <span className="absolute bottom-[-8px] left-0 h-1 w-10 bg-secondary-500 rounded-full"></span>
                        </h3>
                        <p className="text-gray-300 mb-4 text-sm">
                            Subscribe to our newsletter for the latest recipes
                            and cooking tips
                        </p>
                        <form className="flex items-center mb-4">
                            <div className="relative flex-grow">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    className="w-full pr-12 py-3 pl-4 bg-primary-800 border border-primary-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-secondary-400 text-sm"
                                    required
                                />
                                <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                            <button
                                type="submit"
                                className="bg-secondary-500 hover:bg-secondary-600 text-white py-3 px-4 rounded-r-md transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="text-xs text-gray-400">
                            By subscribing, you agree to our privacy policy and
                            consent to receive updates from our company.
                        </p>
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="border-t border-primary-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-center md:text-left mb-4 md:mb-0">
                            &copy; {new Date().getFullYear()}{" "}
                            <Link
                                to="/home"
                                className="text-secondary-400 hover:text-secondary-300"
                            >
                                Spoonfed
                            </Link>
                            . All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link
                                to=""
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to=""
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                to=""
                                className="text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
