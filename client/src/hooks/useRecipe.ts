import { useQuery } from "@tanstack/react-query";
import serverInstance from "../services/serverInstance";

const useRecipe = (id: string) => {
    return useQuery({
        queryKey: ["recipe"],
        queryFn: async () => {
            const { data } = await serverInstance.get(`/recipes/recipe/${id}`);

            return data;
        },
    });
};

export default useRecipe;
