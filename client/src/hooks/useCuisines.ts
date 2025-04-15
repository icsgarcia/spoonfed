import { useQuery } from "@tanstack/react-query";
import serverInstance from "../services/serverInstance";

const useCuisines = () => {
    return useQuery({
        queryKey: ["cuisines"],
        queryFn: async () => {
            const { data } = await serverInstance.get("/recipes/get-cuisines");
            return data;
        },
    });
};

export default useCuisines;
