import { useEffect } from "react";
import { NavLink } from "react-router";
import { FaUtensils, FaHeadset } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

const PageNotFound = () => {
    useEffect(() => {
        document.title = "Spoonfed | Page Not Found";
    }, []);
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-primary-50 to-white py-16 px-4 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative bg-primary-600 h-32 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute -top-8 -left-8 bg-white/10 rounded-full w-32 h-32"></div>
                        <div className="absolute top-10 right-16 bg-white/10 rounded-full w-24 h-24"></div>
                        <div className="absolute -bottom-12 left-1/2 bg-white/10 rounded-full w-40 h-40"></div>
                    </div>
                    <div className="relative flex flex-col items-center">
                        <span className="block font-dancing-script text-4xl font-bold text-white mb-2">
                            Oops!
                        </span>
                        <span className="text-white/80 text-sm">
                            Something's missing from our recipe
                        </span>
                    </div>
                </div>

                <div className="text-center px-6 py-12 md:px-12">
                    <div className="mx-auto w-24 h-24 bg-primary-100 rounded-full -mt-12 flex items-center justify-center border-8 border-white">
                        <FaUtensils className="text-primary-600 text-3xl" />
                    </div>

                    <p className="mt-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary-100 text-secondary-700 font-medium">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-500"></span>
                        </span>
                        404 Error
                    </p>

                    <h1 className="mt-6 text-3xl md:text-4xl font-bold text-gray-800">
                        Page Not Found
                    </h1>

                    <div className="mt-6 max-w-lg mx-auto">
                        <p className="text-gray-600">
                            We couldn't find the page you're looking for. It
                            might have been removed, renamed, or maybe it's
                            still simmering in our kitchen.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <NavLink
                            to="/home"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                        >
                            <FaHome />
                            Return to Home
                        </NavLink>

                        <NavLink
                            to=""
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-primary-600 text-primary-700 font-medium rounded-lg hover:bg-primary-50 transition-colors"
                        >
                            <FaHeadset />
                            Contact Support
                        </NavLink>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-center items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary-500"></span>
                    <span className="text-sm text-gray-500">
                        Try searching for recipes or browse our collections
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
