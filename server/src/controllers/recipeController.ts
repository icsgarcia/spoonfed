import axios from "axios";
import { RecipeModel } from "../models/recipeModel";
import { Request, Response } from "express";
import { UserModel } from "../models/userModel";

interface Recipe {
    name: string;
    description: string;
    image: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    mealType: string[];
    rating: number;
    tags: string[];
    isPublic: boolean;
    userId: string;
}

export const getRecipes = async (req: Request, res: Response): Promise<any> => {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const ITEMS_PER_PAGE = 10;
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const searchQuery = (req.query.query as string) || "";
    const mealType = req.query.mealType as string;
    const cuisine = req.query.cuisine as string;
    try {
        const queryObject: any = {};

        if (userId) {
            queryObject.userId = userId;
        }

        if (searchQuery && searchQuery.trim()) {
            queryObject.name = { $regex: searchQuery, $options: "i" };
        }

        if (mealType && mealType.trim()) {
            queryObject.mealType = mealType;
        }

        if (cuisine) {
            queryObject.cuisine = cuisine;
        }

        const totalPromise = RecipeModel.countDocuments(queryObject);
        const recipesPromise = await RecipeModel.find(queryObject)
            .limit(ITEMS_PER_PAGE)
            .skip(skip);

        const [total, recipes] = await Promise.all([
            totalPromise,
            recipesPromise,
        ]);
        const pageCount = Math.ceil(total / ITEMS_PER_PAGE);

        res.json({
            recipes,
            pagination: {
                currentPage: page,
                pageCount,
                totalItems: total,
                itemsPerPage: ITEMS_PER_PAGE,
            },
        });
    } catch (error) {
        console.error(error);
    }
};

export const getRecipeById = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const response = await RecipeModel.findById(req.params.recipeId);
        res.json(response);
    } catch (error) {
        console.error(error);
    }
};

export const createRecipe = async (
    req: Request,
    res: Response
): Promise<any> => {
    const {
        name,
        description,
        image,
        ingredients,
        instructions,
        prepTimeMinutes,
        cookTimeMinutes,
        servings,
        difficulty,
        cuisine,
        caloriesPerServing,
        mealType,
        rating,
        tags,
        userId,
        isPublic,
    } = req.body;
    try {
        const recipeExist = await RecipeModel.findOne({
            name,
        });
        if (recipeExist) {
            return res.json({ error: "Recipe already exists!" });
        }

        const newRecipe = new RecipeModel({
            name,
            description,
            image,
            ingredients,
            instructions,
            prepTimeMinutes,
            cookTimeMinutes,
            servings,
            difficulty,
            cuisine,
            caloriesPerServing,
            mealType,
            rating,
            tags,
            userId,
            isPublic,
        });
        const response = await newRecipe.save();
        res.json(response);
    } catch (error) {
        console.error(error);
    }
};

export const updateRecipe = async (req: Request, res: Response) => {
    try {
        const updatedRecipe = await RecipeModel.findByIdAndUpdate(
            req.params.recipeId,
            req.body,
            { new: true }
        );
        res.json({ msg: "Recipe updated successfully" });
    } catch (error) {
        console.error(error);
    }
};

export const deleteRecipe = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const deletedRecipe = await RecipeModel.findByIdAndDelete(
            req.params.recipeId
        );

        if (!deletedRecipe) {
            return res.json({ error: "Recipe not found!" });
        }

        res.json(`${deletedRecipe.name} deleted successfully`);
    } catch (error) {
        console.error({ error });
    }
};

export const saveRecipe = async (req: Request, res: Response): Promise<any> => {
    const { userId, recipeId } = req.body;

    try {
        const user = await UserModel.findOne({ uid: userId });
        if (!user) {
            return res.json({ error: "User not found" });
        }

        const recipe = await RecipeModel.findById(recipeId);
        if (!recipe) {
            return res.json({ error: "Recipe not found" });
        }

        const alreadySaved = user.savedRecipes.some(
            (saved) => saved.toString() === recipeId
        );
        if (alreadySaved) {
            return res.json({ error: "Recipe already saved" });
        }

        user.savedRecipes.push(recipe._id);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
    } catch (error) {
        res.json(error);
    }
};

export const checkSavedRecipes = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { userId } = req.params;
    try {
        const user = await UserModel.findOne({ uid: userId });
        if (!user) {
            return res.json({ error: "User not found" });
        }
        res.json(user.savedRecipes);
    } catch (error) {
        res.json(error);
    }
};

export const getSavedRecipes = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { userId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const ITEMS_PER_PAGE = 10;
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const searchQuery = (req.query.query as string) || "";
    const mealType = req.query.mealType as string;
    const cuisine = req.query.cuisine as string;
    try {
        const user = await UserModel.findOne({ uid: userId });
        if (!user) {
            return res.json({ error: "User not found" });
        }

        if (!user.savedRecipes || user.savedRecipes.length === 0) {
            return res.json({
                recipes: [],
                pagination: {
                    currentPage: page,
                    pageCount: 0,
                    totalItems: 0,
                    itemsPerPage: ITEMS_PER_PAGE,
                },
            });
        }

        const queryObject: any = { _id: { $in: user.savedRecipes } };

        if (searchQuery && searchQuery.trim()) {
            queryObject.name = { $regex: searchQuery, $options: "i" };
        }

        if (mealType && mealType.trim()) {
            queryObject.mealType = mealType;
        }

        if (cuisine) {
            queryObject.cuisine = cuisine;
        }

        const totalPromise = RecipeModel.countDocuments(queryObject);
        const recipesPromise = await RecipeModel.find(queryObject)
            .limit(ITEMS_PER_PAGE)
            .skip(skip);

        const [total, recipes] = await Promise.all([
            totalPromise,
            recipesPromise,
        ]);
        const pageCount = Math.ceil(total / ITEMS_PER_PAGE);

        res.json({
            recipes,
            pagination: {
                currentPage: page,
                pageCount,
                totalItems: total,
                itemsPerPage: ITEMS_PER_PAGE,
            },
        });
    } catch (error) {
        res.json(error);
    }
};

export const fetchPublicRecipes = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const response = await axios.get(
            "https://dummyjson.com/recipes?limit=0"
        );
        const recipes = response.data.recipes;
        const recipesExist = await RecipeModel.find({
            name: {
                $in: recipes.map((recipe: { name: string }) => recipe.name),
            },
        });
        if (recipesExist.length > 0)
            return res.json({ msg: "Recipes already exist", recipesExist });
        const newRecipes = recipes.map((recipe: Recipe) => ({
            ...recipe,
            isPublic: true,
        }));
        await RecipeModel.insertMany(newRecipes);
        res.json({ msg: "Public recipes fetched successfully" });
    } catch (error) {
        res.json(error);
    }
};

export const getPublicRecipes = async (
    req: Request,
    res: Response
): Promise<any> => {
    const page = parseInt(req.query.page as string) || 1;
    const ITEMS_PER_PAGE = 10;
    const skip = (page - 1) * ITEMS_PER_PAGE;
    const searchQuery = (req.query.query as string) || "";
    const mealType = req.query.mealType as string;
    const cuisine = req.query.cuisine as string;

    try {
        const queryObject: any = { isPublic: true };

        if (searchQuery && searchQuery.trim()) {
            queryObject.name = { $regex: searchQuery, $options: "i" };
        }

        if (mealType && mealType.trim()) {
            queryObject.mealType = mealType;
        }

        if (cuisine) {
            queryObject.cuisine = cuisine;
        }

        const totalPromise = RecipeModel.countDocuments(queryObject);
        const recipesPromise = await RecipeModel.find(queryObject)
            .limit(ITEMS_PER_PAGE)
            .skip(skip);

        const [total, recipes] = await Promise.all([
            totalPromise,
            recipesPromise,
        ]);
        const pageCount = Math.ceil(total / ITEMS_PER_PAGE);

        res.json({
            recipes,
            pagination: {
                currentPage: page,
                pageCount,
                totalItems: total,
                itemsPerPage: ITEMS_PER_PAGE,
            },
        });
    } catch (error) {
        console.error("Error fetching public recipes:", error);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
};

export const deleteSavedRecipe = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { userId, recipeId } = req.params;
    try {
        const user = await UserModel.findOne({ uid: userId });
        if (!user) {
            return res.json({ error: "User not found" });
        }
        const recipes = user.savedRecipes.filter(
            (savedrecipe) => savedrecipe.toString() !== recipeId
        );
        user.savedRecipes = recipes;
        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
    } catch (error) {
        res.json({ error });
    }
};

export const getAllMealTypes = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const mealTypes = await RecipeModel.aggregate([
            { $match: { tags: { $exists: true, $ne: [] } } },
            { $unwind: "$mealType" },
            { $group: { _id: "$mealType" } },
            { $sort: { _id: 1 } },
            { $project: { _id: 0, tag: "$_id" } },
        ]);

        const mealTypesArray = mealTypes.map((mealType) => mealType.tag);

        return res.json({ mealTypesArray });
    } catch (error) {
        console.error("Error fetching tags:", error);
        return res.status(500).json({ error: "Failed to fetch tags" });
    }
};

export const getAllCuisines = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const cuisines = await RecipeModel.aggregate([
            { $match: { tags: { $exists: true, $ne: [] } } },
            { $unwind: "$cuisine" },
            { $group: { _id: "$cuisine" } },
            { $sort: { _id: 1 } },
            { $project: { _id: 0, tag: "$_id" } },
        ]);

        const cuisinesArray = cuisines.map((cuisines) => cuisines.tag);

        return res.json({ cuisinesArray });
    } catch (error) {
        console.error("Error fetching tags:", error);
        return res.status(500).json({ error: "Failed to fetch tags" });
    }
};

export const getAllDifficulty = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const difficulty = await RecipeModel.aggregate([
            { $match: { tags: { $exists: true, $ne: [] } } },
            { $unwind: "$difficulty" },
            { $group: { _id: "$difficulty" } },
            { $sort: { _id: 1 } },
            { $project: { _id: 0, tag: "$_id" } },
        ]);

        const difficultyArray = difficulty.map((dif) => dif.tag);

        return res.json({ difficultyArray });
    } catch (error) {
        console.error("Error fetching tags:", error);
        return res.status(500).json({ error: "Failed to fetch tags" });
    }
};

export const getFeaturedRecipes = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const recipes = await RecipeModel.find().sort("-rating").limit(4);

        res.json(recipes);
    } catch (error) {
        console.log(error);
    }
};

export const getRecipeByChat = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { userInput } = req.params;
    try {
        const searchRegex = new RegExp(userInput, "i");

        const recipes = await RecipeModel.find({
            $or: [
                { name: searchRegex },
                { description: searchRegex },
                { ingredients: { $elemMatch: { name: searchRegex } } },
                { tags: searchRegex },
                { cuisine: searchRegex },
                { mealType: searchRegex },
            ],
        }).limit(5);
        res.json(recipes);
    } catch (error) {
        console.error(error);
    }
};
