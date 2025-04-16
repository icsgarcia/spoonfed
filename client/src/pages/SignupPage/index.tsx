import { useEffect, useState } from "react";
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaLeaf } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router";
import ImageSection from "./components/ImageSection";
import { Formik, Form } from "formik";
import LoadingSVG from "../../components/LoadingSVG";
import { handleSignup, googleSignIn } from "../../utils/authHandlers";
import { SignupSchema } from "../../validations/authSchema";
import AuthInputBox from "../../components/AuthInputBox";

const SignupPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Spoonfed | Sign Up";
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary-50 to-white py-8">
            <div className="w-full max-w-5xl mx-4 overflow-hidden rounded-xl shadow-xl bg-white flex flex-col lg:flex-row">
                {/* Left Side - Image */}
                <ImageSection />

                {/* Right Side - Signup Form */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12">
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="flex items-center gap-2">
                            <FaLeaf className="text-3xl text-primary-600" />
                            <h2 className="text-3xl font-bold text-primary-700 font-dancing-script">
                                Spoonfed
                            </h2>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-text-dark mb-1 text-center">
                        Create your account
                    </h3>
                    <p className="text-text-muted text-center mb-6">
                        Join our cooking community today!
                    </p>

                    <button
                        onClick={() =>
                            googleSignIn({
                                setIsLoading,
                                navigate,
                                from: "/home",
                            })
                        }
                        disabled={isLoading}
                        className="flex justify-center items-center gap-3 border border-gray-300 w-full rounded-lg py-3 hover:bg-gray-50 transition-colors mb-6 disabled:opacity-70"
                    >
                        <FaGoogle className="text-secondary-600" />
                        <span className="font-medium">
                            Continue with Google
                        </span>
                    </button>

                    <div className="flex items-center justify-center w-full gap-4 mb-6">
                        <div className="h-px flex-1 bg-gray-200"></div>
                        <p className="text-sm text-text-muted">OR</p>
                        <div className="h-px flex-1 bg-gray-200"></div>
                    </div>

                    <Formik
                        initialValues={{
                            username: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={SignupSchema}
                        validateOnBlur={false}
                        validateOnChange={false}
                        onSubmit={(values) =>
                            handleSignup({ values, setIsLoading, navigate })
                        }
                    >
                        {({ isSubmitting }) => (
                            <Form method="post" className="flex flex-col gap-4">
                                <AuthInputBox
                                    htmlFor="username"
                                    label="Username"
                                    icon={<FaUser />}
                                    id="username"
                                    type="text"
                                    placeholder="Choose a username"
                                    name="username"
                                ></AuthInputBox>

                                <AuthInputBox
                                    htmlFor="email"
                                    label="Email Address"
                                    icon={<FaEnvelope />}
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    name="email"
                                ></AuthInputBox>

                                <AuthInputBox
                                    htmlFor="password"
                                    label="Password"
                                    icon={<FaLock />}
                                    id="password"
                                    type="password"
                                    placeholder="Create a strong password"
                                    name="password"
                                ></AuthInputBox>

                                <AuthInputBox
                                    htmlFor="confirmPassword"
                                    label="Confirm Password"
                                    icon={<FaLock />}
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    name="confirmPassword"
                                ></AuthInputBox>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-primary-600 text-white border rounded-lg py-3.5 mt-2 font-medium hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-70 flex justify-center items-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <LoadingSVG />
                                            Creating Account...
                                        </>
                                    ) : (
                                        "Create Account"
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div>
                        <p className="text-sm text-text-muted text-center mt-4">
                            Already have an account?{" "}
                            <NavLink
                                to="/login"
                                className="text-primary-600 font-medium hover:underline"
                            >
                                Log In
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
