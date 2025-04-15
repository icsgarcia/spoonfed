import { useQuery } from "@tanstack/react-query";
import serverInstance from "../services/serverInstance";
import { useAuth } from "../context/AuthProvider";

const useRecipeById = (id: string) => {
    const { currentUser } = useAuth();
    return useQuery({
        queryKey: ["recipeById"],
        queryFn: async () => {
            const token = await currentUser?.getIdToken();
            const { data } = await serverInstance.get(`/recipes/recipe/${id}`, {
                headers: { authorization: `Bearer ${token}` },
            });
            return data;
        },
        enabled: !!currentUser || !!id,
    });
};

export default useRecipeById;
