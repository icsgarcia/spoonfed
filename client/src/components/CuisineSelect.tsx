import useCuisines from "@/hooks/useCuisines";
import React, { Dispatch, SetStateAction } from "react";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";

interface CuisineSelectProps {
    setCuisine: Dispatch<SetStateAction<string>>;
}

const CuisineSelect = ({ setCuisine }: CuisineSelectProps) => {
    const { data: cuisines } = useCuisines();

    return (
        <NativeSelect
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setCuisine(e.target.value);
            }}
        >
            <NativeSelectOption value="">Cuisine</NativeSelectOption>
            {cuisines &&
                cuisines.map((cuisine: string[], index: number) => (
                    <NativeSelectOption key={index} value={cuisine}>
                        {cuisine}
                    </NativeSelectOption>
                ))}
        </NativeSelect>
    );
};

export default CuisineSelect;
