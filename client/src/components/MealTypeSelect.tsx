import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaUtensils, FaChevronDown } from "react-icons/fa6";
import serverInstance from "../services/serverInstance";

interface MealTypeSelectProps {
    setMealType: Dispatch<SetStateAction<string>>;
}

const MealTypeSelect = ({ setMealType }: MealTypeSelectProps) => {
    const [mealTypes, setMealTypes] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getMealTypes = async () => {
            try {
                setIsLoading(true);
                const response = await serverInstance.get(
                    "/recipes/get-meal-types"
                );
                const data = response.data.mealTypesArray;
                setMealTypes(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getMealTypes();
    }, []);

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUtensils className="text-secondary-500" />
            </div>

            <select
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setMealType(e.target.value);
                }}
                disabled={isLoading}
                className={`appearance-none w-full pl-10 pr-10 py-2.5 bg-white border-2 border-gray-200 
                    focus:border-secondary-500 focus:ring focus:ring-secondary-100 focus:ring-opacity-50 
                    rounded-lg shadow-sm transition-all duration-200 text-gray-700
                    ${
                        isLoading
                            ? "cursor-wait opacity-75"
                            : "cursor-pointer hover:border-gray-300"
                    }`}
            >
                <option value="" disabled hidden>
                    {isLoading ? "Loading meal types..." : "Select Meal Type"}
                </option>
                <option value="" className="font-medium">
                    Any Meal Type
                </option>

                {mealTypes.map((mealType) => (
                    <option key={mealType} value={mealType}>
                        {mealType}
                    </option>
                ))}
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FaChevronDown className="text-gray-400" />
            </div>
        </div>
    );
};

export default MealTypeSelect;
