import * as Yup from "yup";

export const ProfileSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name is too long")
        .required("First name is required"),
    lastName: Yup.string()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name is too long")
        .required("Last name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    image: Yup.string()
        .url("Please enter a valid URL")
        .required("Image URL is required"),
});

export const EmailDataSchema = Yup.object().shape({
    newEmail: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
});

export const PasswordDataSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            "Password must contain at least one special character"
        )
        .required("New password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Confirm password is required"),
});
