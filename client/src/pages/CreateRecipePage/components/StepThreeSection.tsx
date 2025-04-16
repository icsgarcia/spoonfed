import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { ErrorMessage, Field, FormikProps } from "formik";
import { Recipe } from "../../../types/recipeTypes";
import LoadingSVG from "../../../components/LoadingSVG";

interface StepThreeSectionProps {
    formik: FormikProps<Recipe>;
    prevStep: () => void;
}

const StepThreeSection = ({ formik, prevStep }: StepThreeSectionProps) => {
    const addInstruction = () => {
        formik.setFieldValue("instructions", [
            ...formik.values.instructions,
            "",
        ]);
    };

    const handleInstructionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        index: number
    ) => {
        const newInstructions = [...formik.values.instructions];
        newInstructions[index] = e.target.value;
        formik.setFieldValue("instructions", newInstructions);
    };

    const removeInstruction = (index: number) => {
        const newInstructions = [...formik.values.instructions];
        newInstructions.splice(index, 1);
        formik.setFieldValue("instructions", newInstructions);
    };

    const hasInstructionErrors =
        formik.touched.instructions &&
        (typeof formik.errors.instructions === "string" ||
            (Array.isArray(formik.errors.instructions) &&
                formik.errors.instructions.length > 0));

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Instructions</h2>
            <p className="text-gray-600">
                Write clear, step-by-step instructions on how to prepare your
                recipe.
            </p>

            {/* Instructions */}
            <div className="space-y-4">
                {formik.values.instructions.map((_, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="flex-grow">
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700 mb-1">
                                    Step {index + 1}
                                </label>
                                <div
                                    className={`flex rounded-lg border overflow-hidden focus-within:ring-2 
                                    ${
                                        hasInstructionErrors
                                            ? "border-red-500 focus-within:ring-red-500 focus-within:border-red-500"
                                            : "border-gray-300 focus-within:ring-primary-500 focus-within:border-primary-500"
                                    }`}
                                >
                                    <Field
                                        component="textarea"
                                        name={`instructions[${index}]`}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLTextAreaElement>
                                        ) => handleInstructionChange(e, index)}
                                        onBlur={formik.handleBlur}
                                        placeholder="Describe this step..."
                                        rows={3}
                                        className="flex-1 px-4 py-3 focus:outline-none w-full resize-none"
                                    />
                                </div>
                                <ErrorMessage
                                    component={"div"}
                                    name={`instructions[${index}]`}
                                    className="text-red-500 mt-1 text-sm"
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => removeInstruction(index)}
                            className="text-red-500 hover:text-red-700 transition-colors mt-9"
                            disabled={formik.values.instructions.length <= 1}
                        >
                            <FaMinusCircle />
                        </button>
                    </div>
                ))}
            </div>

            {formik.touched.instructions &&
                typeof formik.errors.instructions === "string" && (
                    <div className="text-red-500 text-sm">
                        {formik.errors.instructions}
                    </div>
                )}

            <button
                type="button"
                onClick={addInstruction}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors font-medium"
            >
                <FaPlusCircle />
                <span>Add Step</span>
            </button>

            <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                    type="button"
                    onClick={prevStep}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                    Back
                </button>
                <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center disabled:opacity-70"
                >
                    {formik.isSubmitting ? (
                        <>
                            <LoadingSVG />
                            Creating Recipe...
                        </>
                    ) : (
                        "Create Recipe"
                    )}
                </button>
            </div>
        </div>
    );
};

export default StepThreeSection;
