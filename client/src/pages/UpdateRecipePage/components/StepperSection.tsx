import { FaCheck } from "react-icons/fa6";

const StepperSection = ({ activeStep }: { activeStep: number }) => {
    return (
        <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-8 px-4">
                <div
                    className={`flex items-center relative ${
                        activeStep > 1
                            ? "text-primary-600"
                            : activeStep === 1
                            ? "text-primary-600"
                            : "text-gray-400"
                    }`}
                >
                    <div
                        className={`rounded-full transition duration-500 ease-in-out h-10 w-10 flex items-center justify-center ${
                            activeStep > 1
                                ? "bg-primary-100 text-primary-600"
                                : activeStep === 1
                                ? "bg-primary-600 text-white border-primary-600"
                                : "border border-gray-300"
                        }`}
                    >
                        {activeStep > 1 ? (
                            <FaCheck className="text-primary-600" />
                        ) : (
                            1
                        )}
                    </div>
                    <div className="absolute top-0 -ml-10 text-center mt-12 w-32">
                        <span
                            className={`text-sm font-medium ${
                                activeStep >= 1
                                    ? "text-primary-600"
                                    : "text-gray-500"
                            }`}
                        >
                            Basic Info
                        </span>
                    </div>
                </div>
                <div
                    className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                        activeStep > 1
                            ? "border-primary-600"
                            : "border-gray-300"
                    }`}
                ></div>
                <div
                    className={`flex items-center relative ${
                        activeStep > 2
                            ? "text-primary-600"
                            : activeStep === 2
                            ? "text-primary-600"
                            : "text-gray-400"
                    }`}
                >
                    <div
                        className={`rounded-full transition duration-500 ease-in-out h-10 w-10 flex items-center justify-center ${
                            activeStep > 2
                                ? "bg-primary-100 text-primary-600"
                                : activeStep === 2
                                ? "bg-primary-600 text-white"
                                : "border border-gray-300"
                        }`}
                    >
                        {activeStep > 2 ? (
                            <FaCheck className="text-primary-600" />
                        ) : (
                            2
                        )}
                    </div>
                    <div className="absolute top-0 -ml-10 text-center mt-12 w-32">
                        <span
                            className={`text-sm font-medium ${
                                activeStep >= 2
                                    ? "text-primary-600"
                                    : "text-gray-500"
                            }`}
                        >
                            Ingredients
                        </span>
                    </div>
                </div>
                <div
                    className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                        activeStep > 2
                            ? "border-primary-600"
                            : "border-gray-300"
                    }`}
                ></div>
                <div
                    className={`flex items-center relative ${
                        activeStep === 3 ? "text-primary-600" : "text-gray-400"
                    }`}
                >
                    <div
                        className={`rounded-full transition duration-500 ease-in-out h-10 w-10 flex items-center justify-center ${
                            activeStep === 3
                                ? "bg-primary-600 text-white"
                                : "border border-gray-300"
                        }`}
                    >
                        3
                    </div>
                    <div className="absolute top-0 -ml-10 text-center mt-12 w-32">
                        <span
                            className={`text-sm font-medium ${
                                activeStep >= 3
                                    ? "text-primary-600"
                                    : "text-gray-500"
                            }`}
                        >
                            Instructions
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepperSection;
