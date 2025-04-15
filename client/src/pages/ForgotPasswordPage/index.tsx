import { useEffect } from "react";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa6";
import { Link } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import ImageSection from "./components/ImageSection";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { FirebaseError } from "firebase/app";
import { ForgotPasswordSchema } from "../../validations/passwordSchema";
import LoadingSVG from "../../components/LoadingSVG";

const ForgotPasswordPage = () => {
    useEffect(() => {
        document.title = "Spoonfed | Forgot Password";
    }, []);

    const handleForgotPassword = async (
        values: { email: string },
        formikHelpers: FormikHelpers<{ email: string }>
    ) => {
        const { setStatus, setSubmitting } = formikHelpers;

        try {
            await sendPasswordResetEmail(auth, values.email);
            setStatus({
                success: "Password reset email sent. Check your inbox.",
            });
        } catch (error) {
            const authError = error as FirebaseError;
            console.error("Password reset error:", error);

            if (authError.code === "auth/user-not-found") {
                setStatus({
                    error: "No account found with this email address",
                });
            } else if (authError.code === "auth/invalid-email") {
                setStatus({ error: "Invalid email format" });
            } else if (authError.code === "auth/too-many-requests") {
                setStatus({
                    error: "Too many requests. Please try again later",
                });
            } else {
                setStatus({
                    error: "Failed to send password reset email. Please try again.",
                });
            }
        } finally {
            values.email = "";
            setSubmitting(false);
        }
    };
    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gradient-to-br from-primary-50 to-white py-10">
            <div className="w-full max-w-5xl mx-4 overflow-hidden rounded-xl shadow-xl bg-white flex flex-col lg:flex-row">
                {/* Left Side - Password Reset Form */}
                <div className="w-full lg:w-1/2 px-8 py-12 md:px-12">
                    <Link
                        to="/login"
                        className="flex items-center gap-2 text-primary-600 mb-8 font-medium hover:underline"
                    >
                        <FaArrowLeft className="text-sm" />
                        <span>Back to Login</span>
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Forgot Password?
                        </h1>
                        <p className="text-gray-600">
                            Enter your email and we'll send you instructions to
                            reset your password.
                        </p>
                    </div>

                    <Formik
                        initialValues={{ email: "" }}
                        validationSchema={ForgotPasswordSchema}
                        onSubmit={handleForgotPassword}
                        enableReinitialize={true}
                        validateOnBlur={true}
                        validateOnChange={false}
                    >
                        {({ isValid, isSubmitting, status }) => (
                            <Form className="space-y-6">
                                {status?.error && (
                                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
                                        {status.error}
                                    </div>
                                )}

                                {status?.success && (
                                    <div className="p-3 bg-green-50 text-green-600 text-sm rounded-md">
                                        {status.success}
                                    </div>
                                )}

                                <div className="group">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-1.5"
                                    >
                                        Email Address
                                    </label>
                                    <div className="flex border border-gray-300 rounded-lg overflow-hidden group-focus-within:ring-2 group-focus-within:ring-primary-500 group-focus-within:border-primary-500">
                                        <div className="p-3 bg-gray-50 text-gray-500 border-r border-gray-300 flex items-center">
                                            <FaEnvelope />
                                        </div>
                                        <Field
                                            id="email"
                                            type="email"
                                            placeholder="Enter your account email"
                                            name="email"
                                            className="px-4 py-3 focus:outline-none w-full"
                                            required
                                        />
                                    </div>
                                    <ErrorMessage
                                        component="div"
                                        name="email"
                                        className="text-red-600 text-sm"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary-600 text-white py-3.5 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-70 font-medium shadow-sm flex justify-center items-center"
                                >
                                    {isSubmitting && isValid ? (
                                        <>
                                            <LoadingSVG />
                                            Sending Instructions...
                                        </>
                                    ) : (
                                        "Send Reset Instructions"
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600 text-sm">
                            Remember your password?{" "}
                            <Link
                                to="/login"
                                className="text-primary-600 hover:underline font-medium"
                            >
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Right Side - Image */}
                <ImageSection />
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
