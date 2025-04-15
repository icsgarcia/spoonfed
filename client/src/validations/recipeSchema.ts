import * as Yup from "yup";

export const RecipeSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Recipe name must be at least 3 characters")
        .max(100, "Recipe name is too long")
        .required("Recipe name is required"),
    description: Yup.string()
        .min(10, "Description must be at least 10 characters")
        .required("Description is required"),
    image: Yup.string()
        .url("Please enter a valid URL")
        .required("Image URL is required"),
    prepTimeMinutes: Yup.number()
        .min(1, "Prep time cannot be zero or negative")
        .required("Prep time is required"),
    cookTimeMinutes: Yup.number()
        .min(0, "Cook time cannot be negative")
        .required("Cook time is required"),
    servings: Yup.number()
        .min(1, "Servings must be at least 1")
        .required("Servings is required"),
    difficulty: Yup.string()
        .oneOf(["Easy", "Medium", "Hard"], "Please select a difficulty level")
        .required("Difficulty is required"),
    cuisine: Yup.string().required("Please select a cuisine"),
    caloriesPerServing: Yup.number()
        .min(0, "Calories cannot be negative")
        .required("Calories per serving is required"),
    mealType: Yup.array()
        .of(Yup.string())
        .min(1, "Please select at least one meal type"),
    tags: Yup.array().of(Yup.string()),
    ingredients: Yup.array()
        .of(
            Yup.string()
                .required("Ingredient is required")
                .transform((value) => value?.trim())
                .min(3, "Ingredient must be at least 3 characters")
        )
        .min(1, "Please add at least one ingredient")
        .test("no-empty-items", "Ingredients cannot be empty", (value) =>
            value
                ? value.every((item) => item && item.trim().length > 0)
                : false
        ),

    instructions: Yup.array()
        .of(
            Yup.string()
                .required("Instruction is required")
                .transform((value) => value?.trim())
                .min(10, "Instruction must be at least 10 characters")
        )
        .min(1, "Please add at least one instruction")
        .test("no-empty-items", "Instructions cannot be empty", (value) =>
            value
                ? value.every((item) => item && item.trim().length > 0)
                : false
        ),
    isPublic: Yup.boolean(),
});
