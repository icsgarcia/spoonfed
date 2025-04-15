import * as Yup from "yup";

export const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
});

export const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            "Password must contain at least one special character"
        )
        .required("New password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});
