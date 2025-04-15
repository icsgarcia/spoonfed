import { Dispatch, SetStateAction, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { Recipe } from "../../../types/recipeTypes";
import LoadingSVG from "../../../components/LoadingSVG";

interface deleteRecipeModalProps {
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
    handleDelete: (id: string) => Promise<void>;
    recipe: Recipe | null;
}

const DeleteRecipeModal = ({
    setShowDeleteModal,
    handleDelete,
    recipe,
}: deleteRecipeModalProps) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const confirmDelete = async () => {
        setIsDeleting(true);
        await handleDelete(recipe._id);
        setIsDeleting(false);
    };
    return (
        <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => !isDeleting && setShowDeleteModal(false)}
        >
            <div
                className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                    <FaTrash className="text-red-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                    Delete Recipe
                </h3>
                <p className="text-gray-600 text-center mb-6">
                    Are you sure you want to delete "{recipe?.name}"? This
                    action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={() => setShowDeleteModal(false)}
                        className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirmDelete}
                        className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <>
                                <LoadingSVG />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <FaTrash />
                                Delete Recipe
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteRecipeModal;
