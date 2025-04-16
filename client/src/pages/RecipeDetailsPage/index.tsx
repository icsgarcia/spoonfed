import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
    FaBookmark,
    FaClock,
    FaLeaf,
    FaPrint,
    FaTrash,
    FaUtensils,
} from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Loader from "../../components/Loader";
import DeleteRecipeModal from "./components/DeleteRecipeModal";
import DetailsSection from "./components/DetailsSection";
import IngredientsSection from "./components/IngredientsSection";
import InstructionsSection from "./components/InstructionsSection";
import SmallDetailBox from "./components/SmallDetailBox";
import ChatWindow from "../../components/ChatWindow";
import useRecipe from "../../hooks/useRecipe";
import { useAuth } from "../../context/AuthProvider";
import useDeleteRecipe from "../../hooks/useDeleteRecipe";
import useSavedRecipesId from "../../hooks/useSavedRecipesId";
import { useSaveRecipeMutation } from "../../hooks/useToggleSaveRecipe";
import LandingHeader from "../../components/LandingHeader";

const RecipeDetailsPage = () => {
    const { currentUser } = useAuth();
    const params = useParams();
    const {
        data: recipeData,
        isFetching,
        error,
    } = useRecipe(params.id as string);
    const { data: savedRecipesIdData } = useSavedRecipesId();
    const deleteRecipeMutation = useDeleteRecipe();
    const saveRecipeMutation = useSaveRecipeMutation();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [isSaved, setIsSaved] = useState<boolean>();

    const handlePrint = () => {};

    const handleToggleSave = async () => {
        const newSaveState = !isSaved;
        setIsSaved(newSaveState);

        saveRecipeMutation.mutate(
            { recipeId: recipeData?._id, isSaving: newSaveState },
            {
                onError: () => {
                    setIsSaved(!newSaveState);
                },
            }
        );
    };

    const handleDelete = async (id: string) => {
        deleteRecipeMutation.mutate(id);
    };

    useEffect(() => {
        setIsOwner(recipeData?.userId === currentUser?.uid);
    }, [recipeData]);

    useEffect(() => {
        setIsSaved(savedRecipesIdData?.includes(recipeData?._id));
    }, [savedRecipesIdData, recipeData]);

    useEffect(() => {
        document.title = "Spoonfed | Recipe";
    }, []);

    if (isFetching) {
        return (
            <>
                {!currentUser ? <LandingHeader /> : <Header />}
                <div className="min-h-screen flex items-center justify-center">
                    <Loader
                        loading={isFetching}
                        text="Loading recipe details..."
                    />
                </div>
                <Footer />
            </>
        );
    }

    if (error || !recipeData) {
        return (
            <>
                {!currentUser ? <LandingHeader /> : <Header />}
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="text-center max-w-md">
                        <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                            <FaUtensils className="w-full h-full" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Recipe Not Found
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {error!.message ||
                                "This recipe doesn't exist or has been removed."}
                        </p>
                        <NavLink
                            to="/home"
                            className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-colors inline-block"
                        >
                            Browse Recipes
                        </NavLink>
                    </div>
                </div>
            </>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ChatWindow />
            {!currentUser ? <LandingHeader /> : <Header />}

            {/* Recipe Hero Section */}
            <section className="w-full bg-gradient-to-br from-primary-700 to-primary-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-food.png')] bg-repeat opacity-30"></div>
                </div>
                <div className="container mx-auto px-4 py-8 relative">
                    <div className="flex flex-col lg:flex-row items-center gap-6 text-white">
                        <div className="lg:w-1/2 flex flex-col items-start">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {recipeData?.tags
                                    ?.slice(0, 3)
                                    .map((tag: string) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                                {recipeData?.name}
                            </h1>
                            <p className="text-white/80 mb-6 line-clamp-3">
                                {recipeData?.description}
                            </p>
                            <div className="flex flex-wrap gap-6 mb-6">
                                <SmallDetailBox
                                    icon={
                                        <FaClock className="text-secondary-300" />
                                    }
                                    title={"Total Time"}
                                    content={`${
                                        recipeData?.prepTimeMinutes +
                                        recipeData?.cookTimeMinutes
                                    }${" "}
                                            mins`}
                                />
                                <SmallDetailBox
                                    icon={
                                        <FaUtensils className="text-secondary-300" />
                                    }
                                    title={"Difficulty"}
                                    content={`${recipeData?.difficulty}`}
                                />
                                <SmallDetailBox
                                    icon={
                                        <FaLeaf className="text-secondary-300" />
                                    }
                                    title={"Cuisine"}
                                    content={`${recipeData?.cuisine}`}
                                />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {isOwner && (
                                    <>
                                        <NavLink
                                            to={`/recipe/${recipeData?._id}/edit`}
                                            className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg transition-colors"
                                        >
                                            <FaEdit />
                                            <span>Edit Recipe</span>
                                        </NavLink>
                                        <button
                                            onClick={() =>
                                                setShowDeleteModal(true)
                                            }
                                            className="flex items-center gap-1.5 px-4 py-2 bg-red-500/70 hover:bg-red-600/80 border border-red-400/30 rounded-lg transition-colors"
                                        >
                                            <FaTrash />
                                            <span>Delete</span>
                                        </button>
                                    </>
                                )}
                                {currentUser && (
                                    <button
                                        onClick={handleToggleSave}
                                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors ${
                                            savedRecipesIdData.includes(
                                                recipeData?._id
                                            )
                                                ? "bg-secondary-600 hover:bg-secondary-700 text-white"
                                                : "bg-white text-primary-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {isSaved ? (
                                            <>
                                                <FaBookmark />
                                                <span>Saved</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaBookmark />
                                                <span>Save Recipe</span>
                                            </>
                                        )}
                                    </button>
                                )}

                                <button
                                    onClick={handlePrint}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg transition-colors"
                                >
                                    <FaPrint />
                                    <span>Print</span>
                                </button>
                            </div>
                        </div>
                        <div className="lg:w-1/2 flex justify-center lg:justify-end">
                            <div className="w-full max-w-md rounded-xl overflow-hidden shadow-lg border-4 border-white/20">
                                <img
                                    src={
                                        recipeData?.image ||
                                        "/images/recipe-placeholder.jpg"
                                    }
                                    alt={recipeData?.name}
                                    className="w-full h-80 object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "/images/recipe-placeholder.jpg";
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recipe Content */}
            <div className="container mx-auto px-4 pt-12 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Nutrition & Details */}
                    <DetailsSection
                        recipe={recipeData}
                        savedRecipes={savedRecipesIdData}
                        handlePrint={handlePrint}
                        handleToggleSave={handleToggleSave}
                    />

                    {/* Right Column - Ingredients & Instructions */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                            <IngredientsSection recipe={recipeData} />
                            <InstructionsSection recipe={recipeData} />
                        </div>
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <DeleteRecipeModal
                    handleDelete={handleDelete}
                    recipe={recipeData}
                    setShowDeleteModal={setShowDeleteModal}
                />
            )}

            <Footer />
        </div>
    );
};

export default RecipeDetailsPage;
