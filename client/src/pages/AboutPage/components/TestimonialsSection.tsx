import { testimonials } from "../../../data/AboutPageData";

const TestimonialsSection = () => {
    return (
        <section className="py-20 px-6 bg-gray-100">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-3">
                        What People Say
                    </div>
                    <h2 className="font-dancing-script font-bold text-5xl mb-4 text-gray-800">
                        Our Community Speaks
                    </h2>
                    <p className="text-gray-700 max-w-2xl mx-auto">
                        Hear from the food lovers who have made Spoonfed a part
                        of their culinary journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-xl shadow-md relative"
                        >
                            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                                <div className="text-6xl text-primary-200 opacity-50">
                                    "
                                </div>
                            </div>
                            <p className="italic text-gray-700 mb-6 relative z-10">
                                {testimonial.quote}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                                    {testimonial.author.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">
                                        {testimonial.author}
                                    </h4>
                                    <p className="text-gray-500 text-sm">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
