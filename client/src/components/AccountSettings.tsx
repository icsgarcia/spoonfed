import { useState } from "react";
import {
    FaPencil,
    FaCheck,
    FaXmark,
    FaLock,
    FaEnvelope,
    FaTrash,
} from "react-icons/fa6";
import { useAuth } from "../context/AuthProvider";
import serverInstance from "../services/serverInstance";
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../firebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
    EmailDataSchema,
    PasswordDataSchema,
} from "../validations/profileSchema";
import LoadingSVG from "./LoadingSVG";
import { customToast as toast } from "../utils/toast";

interface EmailData {
    newEmail: string;
    password: string;
}

interface PasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const AccountSettings = () => {
    const navigate = useNavigate();
    const { currentUser, refreshUserProfile } = useAuth();
    const [isEditEmail, setIsEditEmail] = useState(false);
    const [isEditPassword, setIsEditPassword] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const initializeEmailData: EmailData = {
        newEmail: currentUser?.email || "",
        password: "",
    };

    const initializePasswordData: PasswordData = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const [deleteConfirmation, setDeleteConfirmation] = useState("");

    const handleEmailSave = async (values: EmailData) => {
        try {
            const credential = EmailAuthProvider.credential(
                currentUser?.email as string,
                values.password
            );
            await reauthenticateWithCredential(currentUser!, credential);

            const token = await currentUser?.getIdToken();
            await serverInstance.put(
                `/auth/update-email/${currentUser?.uid as string}`,
                {
                    newEmail: values.newEmail,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await refreshUserProfile();

            setIsEditEmail(false);
        } catch (error) {
            console.error("Error updating email:", error);
        }
    };

    const handlePasswordSave = async (values: PasswordData) => {
        if (values.newPassword !== values.confirmPassword) {
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(
                currentUser?.email as string,
                values.currentPassword
            );
            await reauthenticateWithCredential(currentUser!, credential);
            await updatePassword(currentUser!, values.newPassword);

            setIsEditPassword(false);
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmation !== "DELETE") {
            return;
        }

        setIsDeleting(true);
        try {
            const token = await currentUser?.getIdToken();
            await serverInstance.delete(`/auth/${currentUser?.uid as string}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Account deleted successfully");

            await auth.signOut();
            navigate("/login");
        } catch (error) {
            console.error("Error deleting account:", error);
        } finally {
            setIsDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center border-b border-gray-100 py-6 px-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Account Settings
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage your account security and preferences
                    </p>
                </div>
            </div>

            <div className="p-8 space-y-8">
                <div className="border-b border-gray-100 pb-8">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                <FaEnvelope />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Email Address
                                </h2>
                                <p className="text-gray-600">
                                    {currentUser?.email}
                                </p>
                            </div>
                        </div>

                        {!isEditEmail && (
                            <button
                                onClick={() => setIsEditEmail(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                            >
                                <FaPencil className="text-sm" />
                                <span>Change Email</span>
                            </button>
                        )}
                    </div>

                    {isEditEmail && (
                        <div className="mt-5 bg-gray-50 p-5 rounded-lg">
                            <Formik
                                initialValues={initializeEmailData}
                                validationSchema={EmailDataSchema}
                                onSubmit={handleEmailSave}
                                enableReinitialize={true}
                                validateOnChange={false}
                                validateOnBlur={true}
                            >
                                {({ isValid, resetForm, isSubmitting }) => (
                                    <Form className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                New Email Address
                                            </label>
                                            <Field
                                                type="email"
                                                id="newEmail"
                                                name="newEmail"
                                                className="w-full px-4 py-2.5 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                            <ErrorMessage
                                                component={"div"}
                                                name="newEmail"
                                                className="text-sm text-red-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Confirm with Password
                                            </label>
                                            <Field
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="Enter your password to confirm"
                                                className="w-full px-4 py-2.5 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                            <ErrorMessage
                                                component={"div"}
                                                name="password"
                                                className="text-sm text-red-600"
                                            />
                                        </div>

                                        <div className="flex justify-end gap-3 pt-4">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    resetForm();
                                                    setIsEditEmail(false);
                                                }}
                                                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                                disabled={isSubmitting}
                                            >
                                                <FaXmark className="text-sm" />
                                                <span>Cancel</span>
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="px-5 py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center gap-2"
                                            >
                                                {isSubmitting && isValid ? (
                                                    <>
                                                        <LoadingSVG />
                                                        <span>Saving...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaCheck className="text-sm" />
                                                        <span>
                                                            Update Email
                                                        </span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}
                </div>

                <div className="border-b border-gray-100 pb-8">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                <FaLock />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Password
                                </h2>
                                <p className="text-gray-600">••••••••••••</p>
                            </div>
                        </div>

                        {!isEditPassword && (
                            <button
                                onClick={() => setIsEditPassword(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                            >
                                <FaPencil className="text-sm" />
                                <span>Change Password</span>
                            </button>
                        )}
                    </div>

                    {isEditPassword && (
                        <div className="mt-5 bg-gray-50 p-5 rounded-lg">
                            <Formik
                                initialValues={initializePasswordData}
                                validationSchema={PasswordDataSchema}
                                onSubmit={handlePasswordSave}
                                enableReinitialize={true}
                                validateOnChange={false}
                                validateOnBlur={true}
                            >
                                {({ isValid, isSubmitting, resetForm }) => (
                                    <Form className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Current Password
                                            </label>
                                            <Field
                                                type="password"
                                                id="currentPassword"
                                                name="currentPassword"
                                                className="w-full px-4 py-2.5 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                            <ErrorMessage
                                                component={"div"}
                                                name="currentPassword"
                                                className="text-sm text-red-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                New Password
                                            </label>
                                            <Field
                                                type="password"
                                                id="newPassword"
                                                name="newPassword"
                                                className="w-full px-4 py-2.5 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                            <ErrorMessage
                                                component={"div"}
                                                name="newPassword"
                                                className="text-sm text-red-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Confirm New Password
                                            </label>
                                            <Field
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                className="w-full px-4 py-2.5 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            />
                                            <ErrorMessage
                                                component={"div"}
                                                name="confirmPassword"
                                                className="text-sm text-red-600"
                                            />
                                        </div>

                                        <div className="flex justify-end gap-3 pt-4">
                                            <button
                                                onClick={() => {
                                                    resetForm();
                                                    setIsEditPassword(false);
                                                }}
                                                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                                disabled={isSubmitting}
                                            >
                                                <FaXmark className="text-sm" />
                                                <span>Cancel</span>
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="px-5 py-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center gap-2"
                                            >
                                                {isSubmitting && isValid ? (
                                                    <>
                                                        <LoadingSVG />
                                                        <span>Saving...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaCheck className="text-sm" />
                                                        <span>
                                                            Update Password
                                                        </span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )}
                </div>

                {/* Delete Account Section */}
                <div>
                    <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-red-50 rounded-lg text-red-600">
                                <FaTrash />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Delete Account
                                </h2>
                                <p className="text-gray-600">
                                    Permanently remove your account and all data
                                </p>
                            </div>
                        </div>

                        {!showDeleteConfirm && (
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                            >
                                <FaTrash className="text-sm" />
                                <span>Delete</span>
                            </button>
                        )}
                    </div>

                    {showDeleteConfirm && (
                        <div className="mt-5 bg-red-50 p-5 rounded-lg border border-red-100">
                            <h3 className="text-red-600 font-medium mb-2">
                                Are you sure?
                            </h3>
                            <p className="text-gray-700 mb-4">
                                This action cannot be undone. All your data,
                                including recipes and saved items, will be
                                permanently deleted.
                            </p>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Type "DELETE" to confirm
                                </label>
                                <input
                                    type="text"
                                    value={deleteConfirmation}
                                    onChange={(e) =>
                                        setDeleteConfirmation(e.target.value)
                                    }
                                    className="w-full px-4 py-2.5 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteConfirm(false);
                                        setDeleteConfirmation("");
                                    }}
                                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                    <FaXmark className="text-sm" />
                                    <span>Cancel</span>
                                </button>
                                <button
                                    onClick={handleDeleteAccount}
                                    disabled={
                                        isDeleting ||
                                        deleteConfirmation !== "DELETE"
                                    }
                                    className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center gap-2"
                                >
                                    {isDeleting ? (
                                        <>
                                            <LoadingSVG />
                                            <span>Deleting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaTrash className="text-sm" />
                                            <span>
                                                Permanently Delete Account
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
