import { FaImage, FaLeaf } from "react-icons/fa6";
import { ErrorMessage, Field, FormikProps } from "formik";
import { Recipe } from "../../../types/recipeTypes";
import useMealTypes from "../../../hooks/useMealTypes";
import useCuisines from "../../../hooks/useCuisines";
import InputText from "../../../components/InputText";
import InputNumber from "../../../components/InputNumber";
import SelectOption from "../../../components/SelectOption";

interface StepOneSectionProps {
    formik: FormikProps<Recipe>;
    nextStep: (formik: FormikProps<Recipe>) => Promise<void>;
}

const StepOneSection = ({ formik, nextStep }: StepOneSectionProps) => {
    const { data: mealTypesData } = useMealTypes();
    const { data: cuisinesData } = useCuisines();

    const toggleMealType = (mealType: string) => {
        const currentMealTypes = [...formik.values.mealType];
        const newMealTypes = currentMealTypes.includes(mealType)
            ? currentMealTypes.filter((type) => type !== mealType)
            : [...currentMealTypes, mealType];

        formik.setFieldValue("mealType", newMealTypes);
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        formik.setFieldValue("tags", value);
    };

    const handleTagsBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value) {
            const tagsArray = value
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0);
            formik.setFieldValue("tags", tagsArray);
        } else {
            formik.setFieldValue("tags", []);
        }
        formik.handleBlur(e);
    };

    const tagsInputValue = Array.isArray(formik.values.tags)
        ? formik.values.tags.join(", ")
        : formik.values.tags || "";

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Recipe Details</h2>

            {/* Recipe Name */}
            <InputText
                formik={formik}
                htmlFor={"name"}
                label={"Recipe Name"}
                id={"name"}
                name={"name"}
                placeholder={"Enter the name of your recipe"}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />

            {/* Recipe Image */}
            <InputText
                formik={formik}
                htmlFor={"image"}
                label={"Recipe Image URL"}
                id={"image"}
                name={"image"}
                placeholder={"Enter URL for your recipe image"}
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                other={"Paste a direct link to an image (JPG, PNG)"}
                children={<FaImage />}
            />

            {/* Image Preview */}
            {formik.values.image && (
                <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                        Image Preview:
                    </p>
                    <div className="rounded-lg overflow-hidden border border-gray-200 h-48 bg-gray-100">
                        <img
                            src={formik.values.image}
                            alt="Recipe preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src =
                                    "/images/recipe-placeholder.jpg";
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Recipe Description */}
            <div className="space-y-1.5">
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                >
                    Description*
                </label>
                <Field
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Describe your recipe in a few sentences"
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border ${
                        formik.touched.description && formik.errors.description
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    } focus:outline-none`}
                />
                <ErrorMessage
                    component={"div"}
                    name={"description"}
                    className="mt-1 text-red-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Preparation Time */}
                <InputNumber
                    formik={formik}
                    htmlFor={"prepTimeMinutes"}
                    label={"Preparation Time (minutes)"}
                    id={"prepTimeMinutes"}
                    name={"prepTimeMinutes"}
                />

                {/* Cooking Time */}
                <InputNumber
                    formik={formik}
                    htmlFor={"cookTimeMinutes"}
                    label={"Cooking Time (minutes)"}
                    id={"cookTimeMinutes"}
                    name={"cookTimeMinutes"}
                />

                {/* Servings */}
                <InputNumber
                    formik={formik}
                    htmlFor={"servings"}
                    label={"Servings"}
                    id={"servings"}
                    name={"servings"}
                />

                {/* Calories */}
                <InputNumber
                    formik={formik}
                    htmlFor={"caloriesPerServing"}
                    label={"Calories per Serving"}
                    id={"caloriesPerServing"}
                    name={"caloriesPerServing"}
                />

                {/* Difficulty */}
                <SelectOption
                    formik={formik}
                    htmlFor={"difficulty"}
                    label={"Difficulty Level"}
                    id={"difficulty"}
                    name={"difficulty"}
                >
                    <option value="" disabled>
                        Select difficulty
                    </option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </SelectOption>

                {/* Cuisine */}
                <SelectOption
                    formik={formik}
                    htmlFor={"cuisine"}
                    label={"Cuisine"}
                    id={"cuisine"}
                    name={"cuisine"}
                >
                    <option value="" disabled>
                        Select cuisine
                    </option>
                    {cuisinesData?.cuisinesArray.map((cuisine: string) => (
                        <option key={cuisine} value={cuisine}>
                            {cuisine}
                        </option>
                    ))}
                </SelectOption>
            </div>

            {/* Meal Types */}
            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                    Meal Type* (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                    {mealTypesData?.mealTypesArray.map((mealType: string) => (
                        <div
                            key={mealType}
                            onClick={() => toggleMealType(mealType)}
                            className={`px-3 py-1.5 rounded-full border cursor-pointer text-sm transition-colors
                                ${
                                    formik.values.mealType.includes(mealType)
                                        ? "bg-primary-600 text-white border-primary-600"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                }
                            `}
                        >
                            {mealType}
                        </div>
                    ))}
                </div>
                {formik.touched.mealType && formik.errors.mealType && (
                    <div className="text-red-500 text-sm">
                        {formik.errors.mealType as string}
                    </div>
                )}
            </div>

            {/* Tags */}
            <InputText
                formik={formik}
                htmlFor={"tags"}
                label={"Tags (comma separated)"}
                id={"tags"}
                name={"tags"}
                value={tagsInputValue}
                onChange={handleTagsChange}
                onBlur={handleTagsBlur}
                placeholder={"vegetarian, quick, family-friendly"}
                other={"Add keywords to help others discover your recipe"}
                children={<FaLeaf />}
            />

            {/* Privacy Toggle */}
            <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                    Recipe Visibility
                </label>
                <div className="flex items-center space-x-3">
                    <div
                        className={`flex items-center justify-center w-11 h-6 rounded-full ${
                            formik.values.isPublic
                                ? "bg-primary-600"
                                : "bg-gray-300"
                        } cursor-pointer`}
                        onClick={() =>
                            formik.setFieldValue(
                                "isPublic",
                                !formik.values.isPublic
                            )
                        }
                    >
                        <div
                            className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                                formik.values.isPublic
                                    ? "translate-x-2"
                                    : "-translate-x-2"
                            }`}
                        ></div>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-700">
                            {formik.values.isPublic ? "Public" : "Private"}
                        </div>
                        <div className="text-xs text-gray-500">
                            {formik.values.isPublic
                                ? "Everyone can see this recipe"
                                : "Only you can see this recipe"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="button"
                    onClick={() => nextStep(formik)}
                    className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center"
                >
                    Continue to Ingredients
                </button>
            </div>
        </div>
    );
};

export default StepOneSection;
