import { useState, useEffect } from "react";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router";
import { auth } from "../../firebase";
import ImageSection from "./components/ImageSection";
import { useLocation } from "react-router";
import { Formik, Form } from "formik";
import LoadingSVG from "../../components/LoadingSVG";
import { LoginSchema } from "../../validations/authSchema";
import { googleSignIn, handleLogin } from "../../utils/authHandlers";
import AuthInputBox from "../../components/AuthInputBox";

interface LocationState {
    from?: string;
}

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { from = "/home" } = (location.state as LocationState) || {};

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate(from, { replace: true });
            }
        });

        return () => unsubscribe();
    }, [from, navigate]);

    useEffect(() => {
        document.title = "Spoonfed | Login";
    }, []);

    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gradient-to-br from-primary-50 to-white">
            <div className="w-full max-w-5xl mx-4 overflow-hidden rounded-xl shadow-xl bg-white flex flex-col lg:flex-row">
                {/* Left side - Image*/}
                <ImageSection />

                {/* Right side - Login form */}
                <div className="w-full lg:w-1/2 px-8 py-12 md:px-12 lg:py-16">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600">
                            Sign in to access your recipe collection
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            googleSignIn({
                                setIsLoading,
                                navigate,
                                from,
                            })
                        }
                        disabled={isLoading}
                        className="flex justify-center items-center gap-3 w-full border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition-colors mb-6"
                    >
                        <FaGoogle className="text-secondary-500" />
                        <span className="font-medium">
                            Continue with Google
                        </span>
                    </button>

                    <div className="flex items-center mb-6">
                        <div className="flex-grow h-px bg-gray-200"></div>
                        <span className="px-4 text-sm text-gray-500">
                            or with email
                        </span>
                        <div className="flex-grow h-px bg-gray-200"></div>
                    </div>

                    {message && (
                        <div className="p-4 mb-6 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                            {message}
                        </div>
                    )}

                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        validationSchema={LoginSchema}
                        validateOnBlur={true}
                        validateOnChange={false}
                        onSubmit={(values) =>
                            handleLogin({
                                values,
                                setIsLoading,
                                setMessage,
                                rememberMe,
                                navigate,
                            })
                        }
                    >
                        {({ isSubmitting, isValid }) => (
                            <Form className="space-y-5">
                                <AuthInputBox
                                    htmlFor={"email"}
                                    label={"Email Address"}
                                    icon={
                                        <FaEnvelope className="text-gray-500" />
                                    }
                                    id={"email"}
                                    type={"email"}
                                    placeholder={"your@email.com"}
                                    name={"email"}
                                ></AuthInputBox>

                                <AuthInputBox
                                    htmlFor={"password"}
                                    label={"Password"}
                                    icon={<FaLock className="text-gray-500" />}
                                    id={"password"}
                                    type={"password"}
                                    placeholder={"Your password"}
                                    name={"password"}
                                ></AuthInputBox>

                                <div className="flex justify-between items-center pt-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="remember-me"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={() =>
                                                setRememberMe(!rememberMe)
                                            }
                                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                        />
                                        <label
                                            htmlFor="remember-me"
                                            className="text-sm text-gray-700"
                                        >
                                            Remember Me
                                        </label>
                                    </div>
                                    <NavLink
                                        to="/forgot-password"
                                        className="text-sm text-primary-600 hover:text-primary-800 hover:underline"
                                    >
                                        Forgot Password?
                                    </NavLink>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !isValid}
                                    className="w-full mt-4 bg-primary-600 text-white py-3.5 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-70 font-medium shadow-sm flex justify-center items-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <LoadingSVG />
                                            Signing in...
                                        </>
                                    ) : (
                                        "Sign In"
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div>
                        <p className="text-sm text-text-muted text-center mt-4">
                            Don't have an account?{" "}
                            <NavLink
                                to="/signup"
                                className="text-primary-600 font-medium hover:underline"
                            >
                                Create one now
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
