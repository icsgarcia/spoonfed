import axios from "axios";

const recipeInstance = axios.create({
    baseURL: "https://dummyjson.com/recipes",
    headers: {
        "Content-Type": "application/json",
    },
});

export default recipeInstance;
