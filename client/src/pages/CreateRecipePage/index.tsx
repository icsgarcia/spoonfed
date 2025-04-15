import { useEffect, useRef, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import Header from "../../components/Header";
import { useNavigate } from "react-router";
import { auth } from "../../firebase";
import serverInstance from "../../services/serverInstance";
import Footer from "../../components/Footer";
import HeroSection from "./components/HeroSection";
import StepperSection from "./components/StepperSection";
import StepOneSection from "./components/StepOneSection";
import StepTwoSection from "./components/StepTwoSection";
import { Recipe } from "../../types/recipeTypes";
import StepThreeSection from "./components/StepThreeSection";
import { RecipeSchema } from "../../validations/recipeSchema";
import { customToast as toast } from "../../utils/toast";
import { useAuth } from "../../context/AuthProvider";

const CreateRecipePage = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [activeStep, setActiveStep] = useState(1);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.title = "Spoonfed | Create Recipe";
    }, []);

    const initialValues: Recipe = {
        _id: "",
        name: "",
        description: "",
        image: "",
        ingredients: [""],
        instructions: [""],
        prepTimeMinutes: 0,
        cookTimeMinutes: 0,
        servings: 1,
        difficulty: "",
        cuisine: "",
        caloriesPerServing: 0,
        mealType: [],
        rating: 0,
        tags: [],
        userId: "",
        isPublic: false,
    };

    const handleSubmit = async (values: Recipe) => {
        try {
            const token = await currentUser?.getIdToken();

            await serverInstance.post(
                "/recipes",
                { ...values, userId: auth.currentUser?.uid },
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            );

            toast.success("Recipe created successfully");
            navigate(-1);
        } catch (error) {
            console.error(error);
            toast.error("Failed to create recipe. Please try again.");
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

        return formik.validateForm().then((errors: Record<string, unknown>) => {
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

            const hasStepErrors = Object.keys(errors).some((key) =>
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
            <HeroSection />

            {/* Form Section */}
            <div className="container mx-auto px-4 py-12" ref={formRef}>
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                    {/* Progress Steps */}
                    <StepperSection activeStep={activeStep} />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={RecipeSchema}
                        validateOnBlur={true}
                        validateOnChange={false}
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

export default CreateRecipePage;
