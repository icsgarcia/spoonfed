import { useQuery } from "@tanstack/react-query";
import serverInstance from "../services/serverInstance";

const usePublicRecipes = (
    page: number,
    debouncedQuery: string,
    mealType: string,
    cuisine: string
) => {
    return useQuery({
        queryKey: ["publicRecipes", page, debouncedQuery, mealType, cuisine],
        queryFn: async () => {
            const { data } = await serverInstance.get(
                "/recipes/public-recipes",
                {
                    params: {
                        page: page,
                        query: debouncedQuery,
                        mealType,
                        cuisine,
                    },
                }
            );
            return data;
        },
    });
};

export default usePublicRecipes;
