import { features } from "../../../data/AboutPageData";

const UniqueFeaturesSection = () => {
    return (
        <section className="py-20 px-6 bg-gradient-to-b from-primary-50 to-white">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-3">
                        Why Choose Us
                    </div>
                    <h2 className="font-dancing-script font-bold text-5xl mb-4 text-gray-800">
                        What Makes Spoonfed Special?
                    </h2>
                    <p className="text-gray-700 max-w-2xl mx-auto">
                        We've created a platform that brings together the best
                        of recipe discovery, organization, and community
                        interaction.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <div
                                data-testid="feature-icon-container"
                                className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-4 text-xl"
                            >
                                {feature.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-gray-800">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UniqueFeaturesSection;
