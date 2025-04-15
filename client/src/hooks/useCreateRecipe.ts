import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthProvider";
import serverInstance from "../services/serverInstance";
import { Recipe } from "../types/recipeTypes";

const useCreateRecipe = (values: Recipe) => {
    const { currentUser } = useAuth();
    return useMutation({
        mutationFn: async () => {
            const token = await currentUser?.getIdToken();
            return serverInstance.post(
                "/recipes",
                { ...values, userId: currentUser?.uid },
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            );
        },
    });
};

export default useCreateRecipe;
