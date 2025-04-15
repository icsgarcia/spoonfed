import { FormEvent, useEffect, useState } from "react";
import {
    FaArrowRight,
    FaBook,
    FaCheck,
    FaEnvelope,
    FaLeaf,
    FaUtensils,
} from "react-icons/fa6";
import LoadingSVG from "./LoadingSVG";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            setIsSubscribed(true);
            setEmail("");
            setError("");
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (isSubscribed) {
            setTimeout(() => {
                setIsSubscribed(false);
            }, 3000);
        }
    });
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 py-16 px-4">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-200 rounded-full opacity-40 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary-200 rounded-full opacity-30 translate-y-1/3 -translate-x-1/4"></div>
            <div className="absolute inset-0 bg-[url('/images/pattern-food.png')] bg-repeat opacity-5"></div>
            <div className="container mx-auto relative">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-2 bg-primary-100 rounded-full mb-4">
                        <FaEnvelope className="text-primary-600 text-xl" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-3">
                        Get Delicious Recipes Delivered
                    </h2>
                    <p className="text-primary-600 max-w-xl mx-auto">
                        Subscribe to our newsletter and never miss a recipe
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-primary-100">
                        <h3 className="text-xl sm:text-2xl font-bold text-primary-800 mb-2">
                            Join Our{" "}
                            <span className="text-secondary-500">Spoonfed</span>{" "}
                            Community
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Get weekly recipes, cooking tips, and special offers
                            straight to your inbox.
                        </p>

                        {isSubscribed ? (
                            <div className="flex items-center p-4 bg-green-50 text-green-700 rounded-lg animate-fade-in">
                                <div className="mr-3 bg-green-100 rounded-full p-1">
                                    <FaCheck className="text-green-600" />
                                </div>
                                <p className="font-medium">
                                    Thanks for subscribing! Check your inbox
                                    soon.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            className={`w-full pl-4 pr-12 py-3 rounded-lg border ${
                                                error
                                                    ? "border-red-300 focus:ring-red-500"
                                                    : "border-gray-300 focus:ring-primary-500"
                                            } focus:border-transparent focus:outline-none focus:ring-2`}
                                            placeholder="your.email@example.com"
                                        />
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <FaEnvelope />
                                        </div>
                                    </div>
                                    {error && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {error}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg transition-all duration-300 ${
                                        isSubmitting
                                            ? "opacity-80 cursor-not-allowed"
                                            : "hover:shadow-md"
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <LoadingSVG />
                                            Subscribing...
                                        </>
                                    ) : (
                                        <>
                                            Subscribe
                                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-gray-500 mt-3 text-center">
                                    We respect your privacy. Unsubscribe at any
                                    time.
                                </p>
                            </form>
                        )}
                    </div>

                    <div className="lg:col-span-7">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-lg border border-primary-100">
                                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                                    <FaUtensils className="text-secondary-600 text-xl" />
                                </div>
                                <h4 className="text-lg font-semibold text-primary-800 mb-2">
                                    New Recipes Weekly
                                </h4>
                                <p className="text-gray-600">
                                    Fresh, trending dishes straight to your
                                    inbox. From quick meals to exotic flavors,
                                    we've got you covered!
                                </p>
                            </div>

                            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-lg border border-primary-100">
                                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                                    <FaBook className="text-secondary-600 text-xl" />
                                </div>
                                <h4 className="text-lg font-semibold text-primary-800 mb-2">
                                    Exclusive Cooking Tips
                                </h4>
                                <p className="text-gray-600">
                                    Hone your skills with expert advice,
                                    step-by-step guides, and pro chef hacks.
                                    Cook like a pro, one recipe at a time!
                                </p>
                            </div>

                            <div className="bg-white bg-opacity-80 backdrop-blur-sm p-5 rounded-lg border border-primary-100">
                                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                                    <FaLeaf className="text-secondary-600 text-xl" />
                                </div>
                                <h4 className="text-lg font-semibold text-primary-800 mb-2">
                                    Seasonal Ingredients
                                </h4>
                                <p className="text-gray-600">
                                    Learn what's in season and how to make the
                                    most of fresh, local ingredients in your
                                    cooking all year round.
                                </p>
                            </div>

                            <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-5 rounded-lg">
                                <h4 className="text-lg font-semibold mb-4">
                                    Join Our Community
                                </h4>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white mb-1">
                                            15k+
                                        </div>
                                        <div className="text-sm text-primary-100">
                                            Subscribers
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white mb-1">
                                            200+
                                        </div>
                                        <div className="text-sm text-primary-100">
                                            Recipes Monthly
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-flex items-center text-primary-800 opacity-75">
                        <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                            className="w-4 h-4 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                    <p className="italic text-gray-600 max-w-xl mx-auto mt-2">
                        "I've discovered so many amazing recipes through this
                        newsletter. The weekly tips have completely transformed
                        how I cook at home!"
                    </p>
                    <p className="mt-2 font-semibold text-primary-700">
                        — Maria L., Home Cook
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
