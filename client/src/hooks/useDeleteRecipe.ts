import { useMutation } from "@tanstack/react-query";
import serverInstance from "../services/serverInstance";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const useDeleteRecipe = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    return useMutation({
        mutationFn: async (id: string) => {
            const token = await currentUser?.getIdToken();
            const { data } = await serverInstance.delete(`/recipes/${id}`, {
                headers: { authorization: `Bearer ${token}` },
            });
            return data;
        },
        onSuccess: () => {
            toast.success("Recipe deleted successfully.");
            navigate("/my-recipes");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to delete the recipe. Please try again.");
        },
    });
};

export default useDeleteRecipe;
