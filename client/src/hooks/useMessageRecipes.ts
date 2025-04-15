import { useQuery } from "@tanstack/react-query";
import serverInstance from "../services/serverInstance";
import { useAuth } from "../context/AuthProvider";

const useMessageRecipes = (userInput: string) => {
    const { currentUser } = useAuth();
    return useQuery({
        queryKey: ["messageRecipes"],
        queryFn: async () => {
            const token = await currentUser?.getIdToken();
            const { data } = await serverInstance.get(
                `/recipes/recipe-chat/${userInput}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );
            return data;
        },
        enabled: !!userInput && !!currentUser,
    });
};

export default useMessageRecipes;
