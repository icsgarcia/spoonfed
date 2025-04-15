import axios from "axios";

const spoonfedInstance = axios.create({
    baseURL: "https://api.spoonacular.com/recipes",
    headers: {
        "Content-Type": "application/json",
    },
});

export default spoonfedInstance;
