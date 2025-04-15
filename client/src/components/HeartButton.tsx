import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useSaveRecipeMutation } from "../hooks/useToggleSaveRecipe";

interface HeartButtonProps {
    recipeId: string;
    savedRecipes?: string[];
}

const HeartButton = ({ recipeId, savedRecipes }: HeartButtonProps) => {
    const [onHover, setOnHover] = useState(false);
    const [isSaved, setIsSaved] = useState(savedRecipes?.includes(recipeId));
    const saveRecipeMutation = useSaveRecipeMutation();

    const handleSaveRecipe = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const newSaveState = !isSaved;
        setIsSaved(newSaveState);

        saveRecipeMutation.mutate(
            { recipeId, isSaving: newSaveState },
            {
                onError: () => {
                    setIsSaved(!newSaveState);
                },
            }
        );
    };
    return (
        <button
            onClick={handleSaveRecipe}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
            className="absolute top-2 right-2 hover:cursor-pointer border-white z-10"
        >
            {onHover || isSaved ? (
                <FaHeart className="text-red-500 size-8" />
            ) : (
                <FaRegHeart className="text-primary-500 size-8" />
            )}
        </button>
    );
};

export default HeartButton;
