import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router";
import {
    FaCaretDown,
    FaBars,
    FaXmark,
    FaHouse,
    FaCircleInfo,
    FaUtensils,
    FaBookmark,
    FaUserGear,
    FaRightFromBracket,
    FaPlus,
} from "react-icons/fa6";
import SpoonfedLogo from "/images/spoonfed-logo.jpg";
import NoImage from "/images/no-img.jpg";
import { auth } from "../firebase";

const Header = () => {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
    const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);
    const profileBtnRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isProfileMenuOpen &&
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target as Node) &&
                profileBtnRef.current &&
                !profileBtnRef.current.contains(event.target as Node)
            ) {
                setIsProfileMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileMenuOpen]);

    const handleLogout = () => {
        auth.signOut();
        navigate("/login");
    };

    return (
        <>
            <header
                className={`py-4 px-4 w-full z-30 relative transition-all duration-300 
                ${
                    isScrolled
                        ? "bg-white shadow-md"
                        : "bg-white/90 backdrop-blur-sm"
                }`}
            >
                <div className="container mx-auto flex justify-between items-center">
                    <NavLink
                        to="/home"
                        className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        <img
                            src={SpoonfedLogo}
                            alt="Spoonfed Logo"
                            className="w-10 h-10 rounded-full"
                        />
                        <h1 className="font-dancing-script font-bold text-2xl md:text-3xl text-primary-800">
                            Spoonfed
                        </h1>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                                ${
                                    isActive
                                        ? "bg-primary-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            <FaHouse className="text-xs" />
                            <span>Home</span>
                        </NavLink>

                        <NavLink
                            to="/recipes"
                            className={({ isActive }) =>
                                `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                                ${
                                    isActive
                                        ? "bg-primary-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            <FaUtensils className="text-xs" />
                            <span>All Recipes</span>
                        </NavLink>
                        <NavLink
                            to="/my-recipes"
                            className={({ isActive }) =>
                                `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                                ${
                                    isActive
                                        ? "bg-primary-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            <FaUtensils className="text-xs" />
                            <span>My Recipes</span>
                        </NavLink>
                        <NavLink
                            to="/saved-recipes"
                            className={({ isActive }) =>
                                `flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                                ${
                                    isActive
                                        ? "bg-primary-600 text-white"
                                        : "text-gray-700 hover:bg-gray-100"
                                }`
                            }
                        >
                            <FaBookmark className="text-xs" />
                            <span>Saved Recipes</span>
                        </NavLink>

                        <NavLink
                            to={"/create-recipe"}
                            className="ml-2 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out bg-secondary-500 hover:bg-secondary-600 text-white"
                        >
                            <FaPlus className="text-xs" />
                            <span>Create Recipe</span>
                        </NavLink>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                        onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
                        aria-label={isNavMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isNavMenuOpen ? (
                            <FaXmark size={20} />
                        ) : (
                            <FaBars size={18} />
                        )}
                    </button>

                    {/* Profile Menu */}
                    <div className="relative">
                        <div
                            ref={profileBtnRef}
                            onClick={() =>
                                setIsProfileMenuOpen(!isProfileMenuOpen)
                            }
                            className="flex items-center gap-2 cursor-pointer select-none"
                        >
                            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary-100">
                                <img
                                    src={auth.currentUser?.photoURL || NoImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = NoImage;
                                    }}
                                />
                            </div>
                            <FaCaretDown
                                className={`text-gray-500 transition-transform duration-300 ${
                                    isProfileMenuOpen ? "rotate-180" : ""
                                }`}
                                size={14}
                            />
                        </div>

                        {/* Profile Dropdown Menu */}
                        {isProfileMenuOpen && (
                            <div
                                ref={profileMenuRef}
                                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-[150] overflow-hidden animate-fade-in"
                                style={{ pointerEvents: "auto" }}
                            >
                                <div className="p-4 text-center border-b border-gray-100">
                                    <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-primary-100">
                                        <img
                                            src={
                                                auth.currentUser?.photoURL ||
                                                NoImage
                                            }
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = NoImage;
                                            }}
                                        />
                                    </div>
                                    <p className="font-medium text-gray-900">
                                        {auth.currentUser?.displayName ||
                                            "User"}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {auth.currentUser?.email}
                                    </p>
                                </div>

                                <div className="py-1">
                                    <NavLink
                                        to="/profile/personal-info"
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() =>
                                            setIsProfileMenuOpen(false)
                                        }
                                    >
                                        <FaUserGear className="text-primary-600" />
                                        <span>Profile Settings</span>
                                    </NavLink>

                                    {auth.currentUser && (
                                        <button
                                            onClick={() => {
                                                setIsProfileMenuOpen(false);
                                                setIsLogoutModalOpen(true);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <FaRightFromBracket />
                                            <span>Logout</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Menu */}
            {isNavMenuOpen && (
                <div className="fixed inset-0 z-[110] md:hidden">
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={() => setIsNavMenuOpen(false)}
                    ></div>

                    {/* Mobile menu panel */}
                    <div className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-white shadow-xl flex flex-col animate-slide-in-left">
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                            <NavLink
                                to="/home"
                                className="flex items-center gap-2"
                                onClick={() => setIsNavMenuOpen(false)}
                            >
                                <img
                                    src={SpoonfedLogo}
                                    alt="Spoonfed Logo"
                                    className="w-8 h-8 rounded-full"
                                />
                                <h1 className="font-dancing-script font-bold text-xl text-primary-800">
                                    Spoonfed
                                </h1>
                            </NavLink>
                            <button
                                onClick={() => setIsNavMenuOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
                            >
                                <FaXmark size={16} />
                            </button>
                        </div>

                        <div className="px-2 py-4 flex-grow">
                            <NavLink
                                to="/home"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors
                                    ${
                                        isActive
                                            ? "bg-primary-100 text-primary-800 font-medium"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                                onClick={() => setIsNavMenuOpen(false)}
                            >
                                <FaHouse
                                    className={`${(isActive: boolean) =>
                                        isActive
                                            ? "text-primary-600"
                                            : "text-gray-500"}
                                `}
                                />
                                <span>Home</span>
                            </NavLink>

                            <NavLink
                                to="/recipes"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors
                                    ${
                                        isActive
                                            ? "bg-primary-100 text-primary-800 font-medium"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                                onClick={() => setIsNavMenuOpen(false)}
                            >
                                <FaUtensils
                                    className={`${(isActive: boolean) =>
                                        isActive
                                            ? "text-primary-600"
                                            : "text-gray-500"}
                                    `}
                                />
                                <span>All Recipes</span>
                            </NavLink>

                            <NavLink
                                to="/my-recipes"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors
                                    ${
                                        isActive
                                            ? "bg-primary-100 text-primary-800 font-medium"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                                onClick={() => setIsNavMenuOpen(false)}
                            >
                                <FaUtensils
                                    className={`${(isActive: boolean) =>
                                        isActive
                                            ? "text-primary-600"
                                            : "text-gray-500"}
                                    `}
                                />
                                <span>My Recipes</span>
                            </NavLink>

                            <NavLink
                                to="/saved-recipes"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors
                                    ${
                                        isActive
                                            ? "bg-primary-100 text-primary-800 font-medium"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`
                                }
                                onClick={() => setIsNavMenuOpen(false)}
                            >
                                <FaBookmark
                                    className={`${(isActive: boolean) =>
                                        isActive
                                            ? "text-primary-600"
                                            : "text-gray-500"}
                                    `}
                                />
                                <span>Saved Recipes</span>
                            </NavLink>

                            <div className="my-4 border-t border-gray-100"></div>

                            <NavLink
                                to={"/create-recipe"}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary-500 text-white hover:bg-secondary-600 transition-colors"
                                onClick={() => setIsNavMenuOpen(false)}
                            >
                                <FaPlus />
                                <span>Create Recipe</span>
                            </NavLink>
                        </div>

                        {auth.currentUser && (
                            <div className="border-t border-gray-100 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border border-primary-100">
                                        <img
                                            src={
                                                auth.currentUser?.photoURL ||
                                                NoImage
                                            }
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm font-medium text-gray-800">
                                            {auth.currentUser?.displayName ||
                                                "User"}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {auth.currentUser?.email}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsNavMenuOpen(false);
                                            setIsLogoutModalOpen(true);
                                        }}
                                        className="w-8 h-8 flex items-center justify-center rounded-full text-red-600 hover:bg-red-50 transition-colors"
                                        aria-label="Logout"
                                    >
                                        <FaRightFromBracket />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Logout Confirmation Modal */}
            {isLogoutModalOpen && (
                <div
                    className="fixed inset-0 z-[200] overflow-y-auto flex items-center justify-center p-4"
                    aria-labelledby="logout-modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsLogoutModalOpen(false)}
                    ></div>

                    <div className="relative bg-white rounded-lg max-w-md w-full shadow-xl transform transition-all animate-scale-in">
                        <div className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                    <FaRightFromBracket className="text-red-600 text-xl" />
                                </div>
                                <div>
                                    <h3
                                        className="text-lg font-semibold text-gray-900"
                                        id="logout-modal-title"
                                    >
                                        Sign out from Spoonfed
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600">
                                        Are you sure you want to log out? You'll
                                        need to sign in again to access your
                                        recipes and settings.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsLogoutModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
