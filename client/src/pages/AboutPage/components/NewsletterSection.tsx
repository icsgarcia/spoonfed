import { icons } from "../../../data/AboutPageData";

const NewsletterSection = () => {
    return (
        <section className="bg-primary-50 py-20 px-6">
            <div className="container mx-auto max-w-3xl">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <h2 className="font-dancing-script font-bold text-4xl mb-2 text-center text-gray-800">
                        Stay Connected
                    </h2>
                    <p className="text-center text-gray-600 mb-8">
                        Subscribe to our newsletter for new recipes, cooking
                        tips, and special offers
                    </p>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                        <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                            Subscribe
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-center text-gray-600 mb-4">
                            Follow us on social media
                        </p>
                        <div className="flex justify-center gap-4">
                            {icons.map((icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 bg-gray-100 hover:bg-primary-100 text-gray-600 hover:text-primary-600 rounded-full flex items-center justify-center transition-colors"
                                >
                                    {icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSection;
