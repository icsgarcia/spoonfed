import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { auth } from "../../firebase";
import { confirmPasswordReset } from "firebase/auth";
import ImageSection from "./components/ImageSection";
import PasswordInputBox from "./components/PasswordInputBox";
import { Form, Formik, FormikHelpers } from "formik";
import { ResetPasswordSchema } from "../../validations/passwordSchema";
import { FirebaseError } from "firebase/app";
import LoadingSVG from "../../components/LoadingSVG";
import { customToast as toast } from "../../utils/toast";

interface ResetPasswordValues {
    password: string;
    confirmPassword: string;
}

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const oobCode = searchParams.get("oobCode");
    const initializeValues: ResetPasswordValues = {
        password: "",
        confirmPassword: "",
    };

    useEffect(() => {
        document.title = "Spoonfed | Reset Password";
    }, []);

    useEffect(() => {
        if (!oobCode) {
            console.log("Invalid or expired password reset link.");
        }
    }, [oobCode]);

    const handleResetPassword = async (
        values: ResetPasswordValues,
        formikHelpers: FormikHelpers<ResetPasswordValues>
    ) => {
        const { setSubmitting, setStatus } = formikHelpers;
        if (!oobCode) return;

        try {
            await confirmPasswordReset(auth, oobCode, values.password);
            setStatus({
                success: "Password reset successful. Redirecting to login...",
            });

            toast.success("Password reset successful!");

            setTimeout(() => navigate("/login"), 1000);
        } catch (error) {
            console.error("Password reset error:", error);
            const authError = error as FirebaseError;

            if (authError.code === "auth/expired-action-code") {
                setStatus({
                    error: "This reset link has expired. Please request a new one.",
                });
            } else if (authError.code === "auth/invalid-action-code") {
                setStatus({
                    error: "Invalid reset link. Please request a new one.",
                });
            } else if (authError.code === "auth/weak-password") {
                setStatus({
                    error: "Password is too weak. Please choose a stronger password.",
                });
            } else {
                setStatus({
                    error: "Failed to reset password. Please try again.",
                });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center w-full min-h-screen bg-gradient-to-br from-primary-50 to-white">
            <div className="w-full max-w-5xl mx-4 overflow-hidden rounded-xl shadow-xl bg-white flex flex-col lg:flex-row">
                {/* Left Side - Form */}
                <div className="w-full lg:w-1/2 px-8 py-12 md:px-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Create New Password
                        </h1>
                        <p className="text-gray-600">
                            Your password must be at least 8 characters.
                        </p>
                    </div>

                    <Formik
                        initialValues={initializeValues}
                        validationSchema={ResetPasswordSchema}
                        onSubmit={handleResetPassword}
                        enableReinitialize={true}
                        validateOnBlur={true}
                        validateOnChange={false}
                    >
                        {({ isSubmitting, isValid, status }) => (
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

                                <PasswordInputBox
                                    htmlFor="password"
                                    label={"New Password"}
                                    id={"password"}
                                    placeholder={"Create a new password"}
                                    name={"password"}
                                />

                                <PasswordInputBox
                                    htmlFor="confirmPassword"
                                    label={"Confirm New Password"}
                                    id={"confirmPassword"}
                                    placeholder={"Confirm your new password"}
                                    name={"confirmPassword"}
                                />

                                <div className="p-4 bg-primary-50 rounded-lg border border-primary-100 text-sm">
                                    <p className="text-gray-700 mb-2 font-medium">
                                        Strong passwords include:
                                    </p>
                                    <ul className="space-y-1 text-gray-600">
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                                            At least 8 characters
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                                            A mix of uppercase and lowercase
                                            letters
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                                            Numbers and special characters
                                        </li>
                                    </ul>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting || !oobCode}
                                    className="w-full bg-primary-600 text-white py-3.5 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-70 font-medium shadow-sm flex justify-center items-center"
                                >
                                    {isSubmitting && isValid ? (
                                        <>
                                            <LoadingSVG />
                                            Updating Password...
                                        </>
                                    ) : (
                                        "Update Password"
                                    )}
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <p className="text-center text-sm text-gray-600 mt-8">
                        Remember your password?{" "}
                        <Link
                            to="/login"
                            className="text-primary-600 hover:underline font-medium"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>

                {/* Right Side - Image */}
                <ImageSection />
            </div>
        </div>
    );
};

export default ResetPasswordPage;
