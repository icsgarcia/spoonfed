import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { ErrorMessage, Field, FormikProps } from "formik";
import { Recipe } from "../../../types/recipeTypes";
import { ChangeEvent } from "react";

interface StepTwoSectionProps {
    formik: FormikProps<Recipe>;
    prevStep: () => void;
    nextStep: (formik: FormikProps<Recipe>) => Promise<void>;
}

const StepTwoSection = ({
    formik,
    prevStep,
    nextStep,
}: StepTwoSectionProps) => {
    const addIngredient = () => {
        formik.setFieldValue("ingredients", [...formik.values.ingredients, ""]);
    };

    const removeIngredient = (index: number) => {
        const newIngredients = [...formik.values.ingredients];
        newIngredients.splice(index, 1);
        formik.setFieldValue("ingredients", newIngredients);
    };

    const handleIngredientChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const newIngredients = [...formik.values.ingredients];
        newIngredients[index] = e.target.value;
        formik.setFieldValue("ingredients", newIngredients);
    };

    const hasIngredientErrors =
        formik.touched.ingredients &&
        (typeof formik.errors.ingredients === "string" ||
            (Array.isArray(formik.errors.ingredients) &&
                formik.errors.ingredients.length > 0));

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Ingredients</h2>
            <p className="text-gray-600">
                List all ingredients needed for your recipe. Be specific with
                amounts and measurements.
            </p>

            <div className="space-y-4">
                {formik.values.ingredients.map((_, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="flex-grow">
                            <div
                                className={`flex rounded-lg border overflow-hidden focus-within:ring-2 
                                ${
                                    hasIngredientErrors
                                        ? "border-red-500 focus-within:ring-red-500 focus-within:border-red-500"
                                        : "border-gray-300 focus-within:ring-primary-500 focus-within:border-primary-500"
                                }`}
                            >
                                <div className="px-4 flex items-center bg-gray-50 text-gray-500 border-r border-gray-300">
                                    <span className="text-sm font-medium">
                                        {index + 1}
                                    </span>
                                </div>
                                <Field
                                    type="text"
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => handleIngredientChange(e, index)}
                                    onBlur={formik.handleBlur}
                                    name={`ingredients[${index}]`}
                                    placeholder="e.g., 2 cups flour, sifted"
                                    className="flex-1 px-4 py-3 focus:outline-none w-full"
                                />
                            </div>
                            <ErrorMessage
                                component={"div"}
                                name={`ingredients[${index}]`}
                                className="mt-1 text-red-500"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="text-red-500 hover:text-red-700 transition-colors mt-3"
                            disabled={formik.values.ingredients.length <= 1}
                        >
                            <FaMinusCircle />
                        </button>
                    </div>
                ))}
            </div>

            {formik.touched.ingredients &&
                typeof formik.errors.ingredients === "string" && (
                    <div className="text-red-500 text-sm">
                        {formik.errors.ingredients}
                    </div>
                )}

            <button
                type="button"
                onClick={addIngredient}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors font-medium"
            >
                <FaPlusCircle />
                <span>Add Ingredient</span>
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
                    type="button"
                    onClick={() => nextStep(formik)}
                    className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                    Continue to Instructions
                </button>
            </div>
        </div>
    );
};

export default StepTwoSection;
