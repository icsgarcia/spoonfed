import { useState } from "react";
import { FaPencil, FaCheck, FaXmark } from "react-icons/fa6";
import NoImage from "/images/no-img.jpg";
import serverInstance from "../services/serverInstance";
import { useAuth } from "../context/AuthProvider";
import { ProfileSchema } from "../validations/profileSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoadingSVG from "./LoadingSVG";

interface UpdateUser {
    firstName: string;
    lastName: string;
    email: string;
    image: string;
}

const PersonalInfo = () => {
    const { currentUser, refreshUserProfile } = useAuth();
    const fName = currentUser?.displayName?.split(" ")[0] || "";
    const lName = currentUser?.displayName?.split(" ")[1] || "";
    const [isEdit, setIsEdit] = useState(false);

    const initialValues: UpdateUser = {
        firstName: fName,
        lastName: lName,
        email: currentUser?.email as string,
        image: currentUser?.photoURL as string,
    };

    const handleSave = async (values: UpdateUser) => {
        try {
            const token = await currentUser?.getIdToken();
            await serverInstance.put(
                `/auth/${currentUser?.uid as string}`,
                {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    image: values.image,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            await refreshUserProfile();
        } catch (error) {
            console.error("Error updating user:", error);
        } finally {
            setIsEdit(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex justify-between items-center border-b border-gray-100 py-6 px-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        My Basic Info
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage your personal information
                    </p>
                </div>
                {!isEdit && (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                        <FaPencil className="text-sm" />
                        <span>Edit</span>
                    </button>
                )}
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={ProfileSchema}
                onSubmit={handleSave}
                enableReinitialize={true}
                validateOnChange={false}
                validateOnBlur={true}
            >
                {({ values, resetForm, isValid, isSubmitting }) => (
                    <Form className="p-8">
                        <div className="grid md:grid-cols-12 gap-8 items-start">
                            <div className="md:col-span-8 space-y-6">
                                <div className="form-group">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                First Name
                                            </label>
                                            <Field
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                disabled={!isEdit}
                                                placeholder="Your first name"
                                                className={`w-full px-4 py-2.5 rounded-lg border ${
                                                    !isEdit
                                                        ? "bg-gray-50 text-gray-500 border-gray-200"
                                                        : "bg-white border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                } transition-all`}
                                            />
                                            <ErrorMessage
                                                component={"div"}
                                                name="firstName"
                                                className="text-sm text-red-600"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Last Name
                                            </label>
                                            <Field
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                disabled={!isEdit}
                                                placeholder="Your last name"
                                                className={`w-full px-4 py-2.5 rounded-lg border ${
                                                    !isEdit
                                                        ? "bg-gray-50 text-gray-500 border-gray-200"
                                                        : "bg-white border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                                } transition-all`}
                                            />
                                            <ErrorMessage
                                                component={"div"}
                                                name="lastName"
                                                className="text-sm text-red-600"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Image URL
                                    </label>
                                    <Field
                                        type="text"
                                        id="image"
                                        name="image"
                                        disabled={!isEdit}
                                        className={`w-full px-4 py-2.5 rounded-lg border ${
                                            !isEdit
                                                ? "bg-gray-50 text-gray-500 border-gray-200"
                                                : "bg-white border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        } transition-all`}
                                    />
                                    <ErrorMessage
                                        component={"div"}
                                        name="image"
                                        className="text-sm text-red-600"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-4 flex flex-col items-center">
                                <div className="text-center">
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Profile Photo
                                    </label>
                                    <div className="group relative mx-auto w-36 h-36 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                                        <img
                                            src={values.image || NoImage}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.src = NoImage;
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isEdit && (
                            <div className="flex justify-end gap-3 pt-6 mt-8 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        resetForm();
                                        setIsEdit(false);
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
                                            <span>Save Changes</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PersonalInfo;
