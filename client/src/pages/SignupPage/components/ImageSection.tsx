import { FaLeaf } from "react-icons/fa6";

const ImageSection = () => {
    return (
        <div className="hidden lg:block lg:w-1/2 relative">
            <div className="h-full">
                <img
                    src="/images/auth-images/auth-image-1.jpg"
                    alt="Fresh ingredients"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary-900/30"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
                    <div className="mb-4 flex items-center gap-2">
                        <FaLeaf className="text-4xl text-secondary-400" />
                        <h2 className="text-4xl font-bold text-white font-dancing-script">
                            Spoonfed
                        </h2>
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-6">
                        Your Recipe Journey Begins Here
                    </h3>
                    <p className="text-white/90 mb-8 max-w-md">
                        Join our community of food enthusiasts. Discover,
                        create, and share delicious recipes from around the
                        world.
                    </p>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center">
                            <span className="text-secondary-300 text-3xl font-bold">
                                5k+
                            </span>
                            <span className="text-white/80 text-sm">
                                Recipes
                            </span>
                        </div>
                        <div className="w-px h-12 bg-white/20"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-secondary-300 text-3xl font-bold">
                                2k+
                            </span>
                            <span className="text-white/80 text-sm">
                                Members
                            </span>
                        </div>
                        <div className="w-px h-12 bg-white/20"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-secondary-300 text-3xl font-bold">
                                100+
                            </span>
                            <span className="text-white/80 text-sm">
                                Cuisines
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageSection;
