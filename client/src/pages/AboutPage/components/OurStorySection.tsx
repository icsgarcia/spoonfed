import { items } from "../../../data/AboutPageData";

const OurStorySection = () => {
    return (
        <section className="py-20 px-6 bg-gradient-to-b from-white to-primary-50">
            <div className="container mx-auto flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/2">
                    <div className="mb-3 inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                        Our Journey
                    </div>
                    <h2 className="font-dancing-script font-bold text-5xl mb-6 text-gray-800">
                        Our Story
                    </h2>
                    <p className="leading-7 text-gray-700 mb-6">
                        Spoonfed was born from a simple idea: Food should be
                        accessible, inspiring, and shared. We started as a small
                        community of food enthusiasts who wanted to create a
                        space where home chefs and food lovers could connect and
                        create together.
                    </p>

                    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                        <h3 className="font-medium text-lg mb-4 text-gray-800">
                            We believe that everyone can:
                        </h3>
                        <ul className="space-y-3">
                            {items.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <span className="mt-1 flex-shrink-0 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                                        <span className="w-2 h-2 bg-white rounded-full"></span>
                                    </span>
                                    <span className="text-gray-700">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="leading-7 text-gray-700">
                        Over time, Spoonfed has evolved into a vibrant hub where
                        thousands of users explore and contribute to a growing
                        collection of tried-and-true recipes.
                    </p>
                </div>

                <div className="md:w-1/2">
                    <div className="relative">
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary-100 rounded-full z-0"></div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-100 rounded-full z-0"></div>
                        <img
                            src="/images/spoonfed-logo.jpg"
                            alt="Our Story"
                            className="rounded-xl shadow-lg w-full relative z-10 border-8 border-white"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStorySection;
