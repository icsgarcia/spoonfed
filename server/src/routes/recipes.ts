import express, { Router } from "express";
import {
    fetchPublicRecipes,
    getPublicRecipes,
    createRecipe,
    getRecipeById,
    getRecipes,
    deleteRecipe,
    updateRecipe,
    saveRecipe,
    checkSavedRecipes,
    getSavedRecipes,
    deleteSavedRecipe,
    getAllMealTypes,
    getAllCuisines,
    getAllDifficulty,
    getFeaturedRecipes,
    getRecipeByChat,
} from "../controllers/recipeController";
import checkIfAuthenticated from "../middlewares/auth";

const router: Router = express.Router();

router.get("/public-recipes", getPublicRecipes);
router.get("/fetch-public-recipes", fetchPublicRecipes);
router.get("/get-meal-types", getAllMealTypes);
router.get("/get-cuisines", getAllCuisines);
router.get("/get-difficulty", getAllDifficulty);
router.get("/recipe/:recipeId", getRecipeById);
router.get("/featured-recipes", getFeaturedRecipes);

router.get("/recipe-chat/:userInput", checkIfAuthenticated, getRecipeByChat);
router.get("/:userId", checkIfAuthenticated, getRecipes);
router.post("/", checkIfAuthenticated, createRecipe);
router.put("/:recipeId", checkIfAuthenticated, updateRecipe);
router.delete("/:recipeId", checkIfAuthenticated, deleteRecipe);
router.put("/", checkIfAuthenticated, saveRecipe);
router.get(
    "/saved-recipes/ids/:userId",
    checkIfAuthenticated,
    checkSavedRecipes
);
router.get("/saved-recipes/:userId", checkIfAuthenticated, getSavedRecipes);
router.delete(
    "/saved-recipes/:userId/:recipeId",
    checkIfAuthenticated,
    deleteSavedRecipe
);

export { router as recipesRouter };
