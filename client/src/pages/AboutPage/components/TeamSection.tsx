import { members } from "../../../data/AboutPageData";

const TeamSection = () => {
    return (
        <section className="py-20 px-6 bg-white">
            <div className="container mx-auto text-center">
                <div className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-3">
                    Meet The Team
                </div>
                <h2 className="font-dancing-script font-bold text-5xl mb-6 text-gray-800">
                    The People Behind Spoonfed
                </h2>
                <p className="text-gray-700 max-w-2xl mx-auto mb-16">
                    We're a passionate team of food lovers, developers, and
                    designers dedicated to creating the best recipe sharing
                    platform.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {members.map((member, index) => (
                        <div key={index} className="text-center">
                            <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                                <div className="w-full h-full bg-primary-200 flex items-center justify-center">
                                    <span className="text-4xl font-bold text-primary-600">
                                        {member.name.charAt(0)}
                                    </span>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg text-gray-800">
                                {member.name}
                            </h3>
                            <p className="text-gray-600">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
