import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import Header from "../../components/Header";
import { auth } from "../../firebase";
import serverInstance from "../../services/serverInstance";
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
import { Recipe } from "../../types/recipeTypes";
import ChatWindow from "../../components/ChatWindow";
import { customToast as toast } from "../../utils/toast";

const RecipeDetailsPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
    const [isOwner, setIsOwner] = useState(false);
    const [error, setError] = useState("");

    const handlePrint = () => {};

    const handleToggleSave = async () => {
        try {
            const token = await auth.currentUser?.getIdToken();
            const isSaved = savedRecipes.includes(recipe?._id || "");

            if (isSaved) {
                await serverInstance.delete(
                    `/recipes/saved-recipes/${auth.currentUser?.uid}/${recipe?._id}`,
                    {
                        headers: { authorization: `Bearer ${token}` },
                    }
                );
                setSavedRecipes(
                    savedRecipes.filter((id) => id !== recipe?._id)
                );
                toast.info("Recipe removed from your saved collection");
            } else {
                await serverInstance.put(
                    "/recipes",
                    { userId: auth.currentUser?.uid, recipeId: recipe?._id },
                    {
                        headers: { authorization: `Bearer ${token}` },
                    }
                );
                setSavedRecipes([...savedRecipes, recipe?._id || ""]);
                toast.success("Recipe saved to your collection!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error updating saved recipes");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const token = await auth.currentUser?.getIdToken();

            const response = await serverInstance.delete(`/recipes/${id}`, {
                headers: { authorization: `Bearer ${token}` },
            });
            const data = response.data;
            console.log(data);
            navigate("/my-recipes");
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const getRecipeById = async () => {
            setIsLoading(true);
            try {
                const token = await auth.currentUser?.getIdToken();
                const response = await serverInstance.get(
                    `/recipes/recipe/${params.id}`,
                    { headers: { authorization: `Bearer ${token}` } }
                );
                const data = response.data;
                setRecipe(data);
                setIsOwner(auth.currentUser?.uid === data.userId);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        getRecipeById();
    }, [params.id]);

    useEffect(() => {
        const getSavedRecipesId = async () => {
            if (auth.currentUser) {
                const token = await auth.currentUser?.getIdToken();
                try {
                    const response = await serverInstance.get(
                        `/recipes/saved-recipes/ids/${auth.currentUser?.uid}`,
                        {
                            headers: {
                                authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setSavedRecipes(response.data || []);
                } catch (error) {
                    console.log(error);
                }
            }
        };

        getSavedRecipesId();
    }, []);

    useEffect(() => {
        document.title = "Spoonfed | Recipe";
    }, []);

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <Loader loading={isLoading} />
                        <p className="mt-4 text-gray-600">
                            Loading recipe details...
                        </p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !recipe) {
        return (
            <>
                <Header />
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="text-center max-w-md">
                        <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                            <FaUtensils className="w-full h-full" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Recipe Not Found
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {error ||
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
            <Header />

            {/* Recipe Hero Section */}
            <section className="w-full bg-gradient-to-br from-primary-700 to-primary-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-food.png')] bg-repeat opacity-30"></div>
                </div>
                <div className="container mx-auto px-4 py-8 relative">
                    <div className="flex flex-col lg:flex-row items-center gap-6 text-white">
                        <div className="lg:w-1/2 flex flex-col items-start">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {recipe.tags?.slice(0, 3).map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                                {recipe.name}
                            </h1>
                            <p className="text-white/80 mb-6 line-clamp-3">
                                {recipe.description}
                            </p>
                            <div className="flex flex-wrap gap-6 mb-6">
                                <SmallDetailBox
                                    icon={
                                        <FaClock className="text-secondary-300" />
                                    }
                                    title={"Total Time"}
                                    content={`${
                                        recipe.prepTimeMinutes +
                                        recipe.cookTimeMinutes
                                    }${" "}
                                            mins`}
                                />
                                <SmallDetailBox
                                    icon={
                                        <FaUtensils className="text-secondary-300" />
                                    }
                                    title={"Difficulty"}
                                    content={`${recipe.difficulty}`}
                                />
                                <SmallDetailBox
                                    icon={
                                        <FaLeaf className="text-secondary-300" />
                                    }
                                    title={"Cuisine"}
                                    content={`${recipe.cuisine}`}
                                />
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {isOwner && (
                                    <>
                                        <NavLink
                                            to={`/recipe/${recipe._id}/edit`}
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
                                <button
                                    onClick={handleToggleSave}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-colors ${
                                        savedRecipes.includes(recipe._id)
                                            ? "bg-secondary-600 hover:bg-secondary-700 text-white"
                                            : "bg-white text-primary-700 hover:bg-gray-100"
                                    }`}
                                >
                                    {savedRecipes.includes(recipe._id) ? (
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
                                        recipe.image ||
                                        "/images/recipe-placeholder.jpg"
                                    }
                                    alt={recipe.name}
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
                        recipe={recipe}
                        savedRecipes={savedRecipes}
                        handlePrint={handlePrint}
                        handleToggleSave={handleToggleSave}
                    />

                    {/* Right Column - Ingredients & Instructions */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                            <IngredientsSection recipe={recipe} />
                            <InstructionsSection recipe={recipe} />
                        </div>
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <DeleteRecipeModal
                    handleDelete={handleDelete}
                    recipe={recipe}
                    setShowDeleteModal={setShowDeleteModal}
                />
            )}

            <Footer />
        </div>
    );
};

export default RecipeDetailsPage;
