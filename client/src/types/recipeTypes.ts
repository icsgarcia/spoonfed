export interface Recipe {
    _id: string;
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
    userId: string;
    isPublic: boolean;
}
