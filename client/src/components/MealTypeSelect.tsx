import { Dispatch, SetStateAction } from "react";
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select";
import useMealTypes from "@/hooks/useMealTypes";

interface MealTypeSelectProps {
    setMealType: Dispatch<SetStateAction<string>>;
}

const MealTypeSelect = ({ setMealType }: MealTypeSelectProps) => {
    const { data: mealTypes } = useMealTypes();

    return (
        <NativeSelect
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setMealType(e.target.value);
            }}
        >
            <NativeSelectOption value="">Meal Type</NativeSelectOption>
            {mealTypes &&
                mealTypes.map((mealType: string[], index: number) => (
                    <NativeSelectOption key={index} value={mealType}>
                        {mealType}
                    </NativeSelectOption>
                ))}
        </NativeSelect>
    );
};

export default MealTypeSelect;
