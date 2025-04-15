import { useQuery } from "@tanstack/react-query";
import serverInstance from "../services/serverInstance";
import { useAuth } from "../context/AuthProvider";

const useSavedRecipes = (
    page: number,
    debouncedQuery: string,
    mealType: string,
    cuisine: string
) => {
    const { currentUser } = useAuth();
    return useQuery({
        queryKey: ["savedRecipes", page, debouncedQuery, mealType, cuisine],
        queryFn: async () => {
            const token = await currentUser?.getIdToken();
            const { data } = await serverInstance.get(
                `/recipes/saved-recipes/${currentUser?.uid}`,
                {
                    params: {
                        page: page,
                        query: debouncedQuery,
                        mealType,
                        cuisine,
                    },
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            return data;
        },
    });
};

export default useSavedRecipes;
