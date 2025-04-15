import { missions } from "../../../data/AboutPageData";

const OurMissionSection = () => {
    return (
        <section className="bg-primary-800 text-white py-20 px-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-food.png')] bg-repeat opacity-30"></div>
            </div>
            <div className="container mx-auto text-center relative z-10">
                <div className="inline-block mb-3 px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                    What We Stand For
                </div>
                <h2 className="font-dancing-script font-bold text-5xl md:text-6xl mb-6">
                    Our Mission
                </h2>
                <p className="text-xl text-white/90 mb-14 max-w-2xl mx-auto">
                    We're on a mission to make cooking more accessible,
                    enjoyable, and connected for everyone.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {missions.map((mission, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:transform hover:-translate-y-2 transition-all"
                        >
                            <div className="w-14 h-14 rounded-full bg-secondary-500 text-white flex items-center justify-center mb-6 mx-auto text-xl">
                                {mission.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-3">
                                {mission.title}
                            </h3>
                            <p className="text-white/80 text-sm">
                                {mission.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurMissionSection;
