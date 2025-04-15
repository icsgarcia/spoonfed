import { useQuery } from "@tanstack/react-query";
import serverInstance from "../services/serverInstance";

const useFeaturedRecipes = () => {
    return useQuery({
        queryKey: ["featuredRecipes"],
        queryFn: async () => {
            const { data } = await serverInstance.get(
                "/recipes/featured-recipes"
            );
            return data;
        },
    });
};

export default useFeaturedRecipes;
