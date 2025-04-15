import { toast } from "react-toastify";
import serverInstance from "../services/serverInstance";
import {
    browserLocalPersistence,
    browserSessionPersistence,
    GoogleAuthProvider,
    setPersistence,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { NavigateFunction } from "react-router";
import { Dispatch, SetStateAction } from "react";

interface SignupValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface LoginValues {
    email: string;
    password: string;
}

interface HandleSignupProps {
    values: SignupValues;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    navigate: NavigateFunction;
}

interface HandleLoginProps {
    values: LoginValues;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setMessage: Dispatch<SetStateAction<string>>;
    rememberMe: boolean;
    navigate: NavigateFunction;
}

interface GoogleSignInProps {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    navigate: NavigateFunction;
    from: string;
}

export const handleSignup = async ({
    values,
    setIsLoading,
    navigate,
}: HandleSignupProps) => {
    setIsLoading(true);
    try {
        const response = await serverInstance.post("/auth/register", {
            username: values.username,
            email: values.email,
            password: values.password,
        });
        const data = response.data;
        console.log(data);

        toast.success("Registered successfully");

        setTimeout(() => {
            navigate("/login");
        }, 1000);
    } catch (error) {
        toast.error((error as Error).message);
    } finally {
        setIsLoading(false);
    }
};

export const handleLogin = async ({
    values,
    setIsLoading,
    setMessage,
    rememberMe,
    navigate,
}: HandleLoginProps) => {
    setIsLoading(true);
    setMessage("");

    try {
        await setPersistence(
            auth,
            rememberMe ? browserLocalPersistence : browserSessionPersistence
        );

        const user = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );

        if (!user) {
            throw Error("User not found");
        }

        toast.success("Logged in successfully");
        setTimeout(() => {
            navigate("/home");
        }, 1000);
    } catch (error) {
        if (error instanceof FirebaseError) {
            let errorMessage;

            switch (error.code) {
                case "auth/invalid-credential":
                case "auth/user-not-found":
                case "auth/wrong-password":
                    errorMessage = "Invalid email or password";
                    break;
                case "auth/too-many-requests":
                    errorMessage =
                        "Too many failed login attempts. Please try again later";
                    break;
                case "auth/user-disabled":
                    errorMessage = "This account has been disabled";
                    break;
                default:
                    errorMessage = error.message;
            }

            setMessage(errorMessage);
            toast.error(errorMessage);
        } else {
            const errorMessage = (error as Error).message;
            setMessage(errorMessage);
            toast.error(errorMessage);
        }
    } finally {
        setIsLoading(false);
    }
};

export const googleSignIn = async ({
    setIsLoading,
    navigate,
    from,
}: GoogleSignInProps) => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        await serverInstance.post("/auth/google", {
            uid: user.uid,
            username: user.displayName,
            email: user.email,
        });

        toast.success("Logged in successfully");
        setTimeout(() => {
            navigate(from);
        }, 1000);
    } catch (error) {
        const credential = GoogleAuthProvider.credentialFromError(
            error as FirebaseError
        );
        console.log(credential);
        toast.error((error as Error).message);
    } finally {
        setIsLoading(false);
    }
};
