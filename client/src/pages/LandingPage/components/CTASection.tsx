import { NavLink } from "react-router";
import { benefits } from "../../../data/AboutPageData";

const CTASection = () => {
    return (
        <section className="py-20 px-6 bg-gradient-to-br from-primary-700 to-primary-800 text-white relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-600 rounded-full opacity-30"></div>
                <div className="absolute -bottom-32 -left-16 w-80 h-80 bg-secondary-500 rounded-full opacity-10"></div>
            </div>
            <div className="container mx-auto text-center relative z-10">
                <h2 className="font-dancing-script font-bold text-5xl mb-6">
                    Join Our Community!
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
                    Become a part of the Spoonfed family and start your culinary
                    journey today.
                </p>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 max-w-3xl mx-auto mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3"
                            >
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary-500 flex items-center justify-center">
                                    <svg
                                        className="w-3 h-3 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>

                    <NavLink
                        to="/signup"
                        className="inline-block px-8 py-4 bg-secondary-500 hover:bg-secondary-600 text-white font-medium rounded-lg shadow-lg transition-colors"
                    >
                        Sign Up For Free
                    </NavLink>
                </div>

                <p className="italic text-white/80">
                    Let's cook, share, and inspire—together!
                </p>
            </div>
        </section>
    );
};

export default CTASection;
