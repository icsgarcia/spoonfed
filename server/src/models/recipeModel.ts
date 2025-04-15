import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    prepTimeMinutes: { type: Number, required: true },
    cookTimeMinutes: { type: Number, required: true },
    servings: { type: Number, required: true },
    difficulty: { type: String, required: true },
    cuisine: { type: String, required: true },
    caloriesPerServing: { type: Number, required: true },
    mealType: [{ type: String, required: true }],
    rating: { type: Number, required: true },
    tags: [{ type: String, required: true }],
    isPublic: { type: Boolean, required: true },
    userId: {
        type: String,
        required: true,
    },
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);
