import { toast, Slide, ToastOptions } from "react-toastify";

const baseConfig: ToastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
};

export const customToast = {
    success: (message: string, options: ToastOptions = {}) => {
        toast.success(message, { ...baseConfig, ...options });
    },

    error: (message: string, options = {}) => {
        toast.error(message, { ...baseConfig, ...options });
    },

    info: (message: string, options = {}) => {
        toast.info(message, { ...baseConfig, ...options });
    },

    warning: (message: string, options = {}) => {
        toast.warning(message, { ...baseConfig, ...options });
    },
};
