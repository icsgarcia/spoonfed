import { FaUtensils } from "react-icons/fa6";

const ImageSection = () => {
    return (
        <div className="hidden lg:block lg:w-1/2 relative">
            <img
                src="/images/auth-images/auth-image-2.jpeg"
                alt="Delicious food"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary-900/30"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
                <div className="flex items-center gap-3 mb-6">
                    <FaUtensils className="text-3xl text-secondary-300" />
                    <h2 className="text-5xl font-dancing-script font-bold">
                        Spoonfed
                    </h2>
                </div>
                <p className="text-xl text-center mb-8 max-w-md font-serif">
                    Your personal recipe collection awaits!
                </p>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 text-center">
                    <blockquote className="italic font-serif">
                        "Cooking is like love. It should be entered into with
                        abandon or not at all."
                    </blockquote>
                    <p className="mt-4 font-serif text-sm">
                        — Harriet Van Horne
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImageSection;
