import { useMutation, useQueryClient } from "@tanstack/react-query";
import serverInstance from "../services/serverInstance";
import { useAuth } from "../context/AuthProvider";

export function useSaveRecipeMutation() {
    const { currentUser } = useAuth();
    const queryClient = useQueryClient();

    const saveRecipeMutation = useMutation({
        mutationFn: async ({
            recipeId,
            isSaving,
        }: {
            recipeId: string;
            isSaving: boolean;
        }) => {
            const token = await currentUser?.getIdToken();

            if (isSaving) {
                return serverInstance.put(
                    "/recipes",
                    { userId: currentUser?.uid, recipeId },
                    { headers: { authorization: `Bearer ${token}` } }
                );
            } else {
                return serverInstance.delete(
                    `/recipes/saved-recipes/${currentUser?.uid}/${recipeId}`,
                    { headers: { authorization: `Bearer ${token}` } }
                );
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
            queryClient.invalidateQueries({ queryKey: ["savedRecipesId"] });
        },
    });

    return saveRecipeMutation;
}
