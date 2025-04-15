import { Auth } from "firebase/auth";
import { NavLink } from "react-router";
import { FaUser, FaGear, FaUtensils, FaBookmark } from "react-icons/fa6";
import NoImage from "/images/no-img.jpg";

const SideMenu = ({ auth }: { auth: Auth }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* User Info Section */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 border-b border-gray-100">
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden mb-3">
                        <img
                            src={auth.currentUser?.photoURL || NoImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = NoImage;
                            }}
                        />
                    </div>
                    <h3 className="font-semibold text-gray-900">
                        {auth.currentUser?.displayName || "User"}
                    </h3>
                    <p className="text-sm text-gray-500 truncate max-w-full">
                        {auth.currentUser?.email}
                    </p>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="p-3">
                <NavLink
                    to="/profile/personal-info"
                    className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors
                        ${
                            isActive
                                ? "bg-primary-50 text-primary-700 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                        }
                    `}
                >
                    <FaUser />
                    <span>Personal Info</span>
                </NavLink>

                <NavLink
                    to="/profile/account-settings"
                    className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors
                        ${
                            isActive
                                ? "bg-primary-50 text-primary-700 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                        }
                    `}
                >
                    <FaGear />
                    <span>Account Settings</span>
                </NavLink>

                <div className="h-px bg-gray-200 my-3"></div>

                <NavLink
                    to="/my-recipes"
                    className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors
                        ${
                            isActive
                                ? "bg-primary-50 text-primary-700 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                        }
                    `}
                >
                    <FaUtensils />
                    <span>My Recipes</span>
                </NavLink>

                <NavLink
                    to="/saved-recipes"
                    className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors
                        ${
                            isActive
                                ? "bg-primary-50 text-primary-700 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                        }
                    `}
                >
                    <FaBookmark />
                    <span>Saved Recipes</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default SideMenu;
