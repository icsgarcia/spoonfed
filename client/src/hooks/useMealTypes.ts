import { useQuery } from "@tanstack/react-query";
import serverInstance from "../services/serverInstance";

const useMealTypes = () => {
    return useQuery({
        queryKey: ["mealTypes"],
        queryFn: async () => {
            const { data } = await serverInstance.get(
                "/recipes/get-meal-types"
            );
            return data;
        },
    });
};

export default useMealTypes;
