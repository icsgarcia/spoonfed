import { useMutation, useQueryClient } from "@tanstack/react-query";
import serverInstance from "../services/serverInstance";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";

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
                const { data } = await serverInstance.put(
                    "/recipes",
                    { userId: currentUser?.uid, recipeId },
                    { headers: { authorization: `Bearer ${token}` } }
                );
                return { ...data, isSaving };
            } else {
                const { data } = await serverInstance.delete(
                    `/recipes/saved-recipes/${currentUser?.uid}/${recipeId}`,
                    { headers: { authorization: `Bearer ${token}` } }
                );
                return { ...data, isSaving };
            }
        },
        onSuccess: (result) => {
            queryClient.invalidateQueries({ queryKey: ["savedRecipes"] });
            queryClient.invalidateQueries({ queryKey: ["savedRecipesId"] });

            if (result.isSaving) {
                toast.success("Recipe saved to your collection!");
            } else {
                toast.info("Recipe removed from your saved collection");
            }
        },
        onError: () => {
            toast.error("Error updating saved recipes");
        },
    });

    return saveRecipeMutation;
}
