import { useEffect, useRef, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router";
import { auth } from "../../firebase";
import serverInstance from "../../services/serverInstance";
import Footer from "../../components/Footer";
import StepperSection from "./components/StepperSection";
import StepOneSection from "./components/StepOneSection";
import StepTwoSection from "./components/StepTwoSection";
import { Recipe } from "../../types/recipeTypes";
import StepThreeSection from "./components/StepThreeSection";
import { RecipeSchema } from "../../validations/recipeSchema";
import { FaUtensils } from "react-icons/fa6";
import { customToast as toast } from "../../utils/toast";
import useRecipeById from "../../hooks/useRecipeById";

const UpdateeRecipePage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(1);
    const formRef = useRef<HTMLDivElement>(null);
    const { data: recipeByIdData } = useRecipeById(params.id as string);

    useEffect(() => {
        document.title = "Spoonfed | Update Recipe";
    }, []);

    const initialValues: Recipe = {
        _id: recipeByIdData?._id || "",
        name: recipeByIdData?.name || "",
        description: recipeByIdData?.description || "",
        image: recipeByIdData?.image || "",
        ingredients: recipeByIdData?.ingredients || [""],
        instructions: recipeByIdData?.instructions || [""],
        prepTimeMinutes: recipeByIdData?.prepTimeMinutes || 0,
        cookTimeMinutes: recipeByIdData?.cookTimeMinutes || 0,
        servings: recipeByIdData?.servings || 1,
        difficulty: recipeByIdData?.difficulty || "",
        cuisine: recipeByIdData?.cuisine || "",
        caloriesPerServing: recipeByIdData?.caloriesPerServing || 0,
        mealType: recipeByIdData?.mealType || [],
        rating: recipeByIdData?.rating || 0,
        tags: recipeByIdData?.tags || [],
        userId: recipeByIdData?.userId || "",
        isPublic: recipeByIdData?.isPublic || false,
    };

    const handleSubmit = async (values: Recipe) => {
        try {
            const token = await auth.currentUser?.getIdToken();

            await serverInstance.put(`/recipes/${params.id}`, values, {
                headers: { authorization: `Bearer ${token}` },
            });

            toast.success("Recipe Update successfully");
            navigate(-1);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update recipe. Please try again.");
        }
    };

    const validateStep = async (
        formik: FormikProps<Recipe>,
        step: number
    ): Promise<boolean> => {
        const touchFields = () => {
            switch (step) {
                case 1:
                    formik.setTouched({
                        name: true,
                        description: true,
                        image: true,
                        prepTimeMinutes: true,
                        cookTimeMinutes: true,
                        servings: true,
                        difficulty: true,
                        cuisine: true,
                        mealType: true,
                    });
                    break;
                case 2:
                    const ingredientsTouched = formik.values.ingredients.reduce(
                        (acc, _, index) => {
                            acc[`ingredients[${index}]`] = true;
                            return acc;
                        },
                        {} as Record<string, boolean>
                    );

                    formik.setTouched({
                        ...formik.touched,
                        ...ingredientsTouched,
                    });
                    break;
                case 3:
                    formik.setTouched({
                        ...formik.touched,
                        instructions: true,
                    });
                    break;
            }
        };

        touchFields();

        return formik.validateForm().then((errors: unknown) => {
            const stepFieldErrors = {
                1: [
                    "name",
                    "description",
                    "image",
                    "prepTimeMinutes",
                    "cookTimeMinutes",
                    "servings",
                    "difficulty",
                    "cuisine",
                    "mealType",
                ],
                2: ["ingredients"],
                3: ["instructions"],
            };

            const hasStepErrors = Object.keys(
                errors as Record<string, unknown>
            ).some((key) =>
                stepFieldErrors[step as keyof typeof stepFieldErrors].includes(
                    key
                )
            );

            return !hasStepErrors;
        });
    };

    const nextStep = async (formik: FormikProps<Recipe>) => {
        const isValid = await validateStep(formik, activeStep);

        if (isValid) {
            if (activeStep < 3) {
                setActiveStep(activeStep + 1);
                if (formRef.current) {
                    formRef.current.scrollIntoView({ behavior: "smooth" });
                }
            }
        } else {
            toast.error("Please fix validation errors before continuing");
        }
    };

    const prevStep = () => {
        if (activeStep > 1) {
            setActiveStep(activeStep - 1);
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <Header />
            <section className="bg-gradient-to-br from-primary-700 to-primary-800 py-12 px-4">
                <div className="container mx-auto text-center">
                    <div className="mb-2 inline-flex items-center justify-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full backdrop-blur-sm">
                        <FaUtensils className="text-secondary-300" />
                        <span>Recipe Editor</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Update Your Recipe
                    </h1>
                    <p className="text-white/80 max-w-xl mx-auto">
                        Refine and perfect your culinary masterpiece
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <div className="container mx-auto px-4 py-12" ref={formRef}>
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Progress Steps */}
                    <StepperSection activeStep={activeStep} />

                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={RecipeSchema}
                        validateOnChange={false}
                        validateOnBlur={true}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => (
                            <Form className="py-8 px-6 md:px-10">
                                {activeStep === 1 && (
                                    <StepOneSection
                                        formik={formik}
                                        nextStep={nextStep}
                                    />
                                )}

                                {activeStep === 2 && (
                                    <StepTwoSection
                                        formik={formik}
                                        prevStep={prevStep}
                                        nextStep={nextStep}
                                    />
                                )}

                                {activeStep === 3 && (
                                    <StepThreeSection
                                        formik={formik}
                                        prevStep={prevStep}
                                    />
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UpdateeRecipePage;
