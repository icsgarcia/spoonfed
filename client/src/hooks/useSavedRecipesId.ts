import { useQuery } from "@tanstack/react-query";
import serverInstance from "../services/serverInstance";
import { useAuth } from "../context/AuthProvider";

const useSavedRecipesId = () => {
    const { currentUser } = useAuth();
    return useQuery({
        queryKey: ["savedRecipesId"],
        queryFn: async () => {
            const token = await currentUser?.getIdToken();
            const { data } = await serverInstance.get(
                `/recipes/saved-recipes/ids/${currentUser?.uid}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            return data;
        },
        enabled: !!currentUser,
    });
};

export default useSavedRecipesId;
