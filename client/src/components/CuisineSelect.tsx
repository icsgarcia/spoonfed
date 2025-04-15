import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaGlobe, FaChevronDown } from "react-icons/fa6";
import serverInstance from "../services/serverInstance";

interface CuisineSelectProps {
    setCuisine: Dispatch<SetStateAction<string>>;
}

const CuisineSelect = ({ setCuisine }: CuisineSelectProps) => {
    const [cuisines, setCuisines] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getCuisines = async () => {
            try {
                setIsLoading(true);
                const response = await serverInstance.get(
                    "/recipes/get-cuisines"
                );
                const data = response.data.cuisinesArray;
                setCuisines(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getCuisines();
    }, []);

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaGlobe className="text-primary-500" />
            </div>

            <select
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setCuisine(e.target.value);
                }}
                disabled={isLoading}
                className={`appearance-none w-full pl-10 pr-10 py-2.5 bg-white border-2 border-gray-200 
                    focus:border-primary-500 focus:ring focus:ring-primary-100 focus:ring-opacity-50 
                    rounded-lg shadow-sm transition-all duration-200 text-gray-700
                    ${
                        isLoading
                            ? "cursor-wait opacity-75"
                            : "cursor-pointer hover:border-gray-300"
                    }`}
            >
                <option value="" disabled hidden>
                    {isLoading ? "Loading cuisines..." : "Select Cuisine"}
                </option>
                <option value="" className="font-medium">
                    Any Cuisine
                </option>

                {cuisines.map((cuisine) => (
                    <option key={cuisine} value={cuisine} className="py-1">
                        {cuisine}
                    </option>
                ))}
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FaChevronDown className="text-gray-400" />
            </div>
        </div>
    );
};

export default CuisineSelect;
