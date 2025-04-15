import { ErrorMessage, Field, FormikProps } from "formik";
import { Recipe } from "../types/recipeTypes";

interface InputTextProps {
    formik: FormikProps<Recipe>;
    htmlFor: string;
    label: string;
    id: string;
    name: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
    other?: string;
}

const InputText = ({
    formik,
    htmlFor,
    label,
    id,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    children,
    other,
}: InputTextProps) => {
    return (
        <div className="space-y-1.5">
            <label
                htmlFor={htmlFor}
                className="block text-sm font-medium text-gray-700"
            >
                {label}*
            </label>
            <div
                className={`flex rounded-lg border overflow-hidden focus-within:ring-2 
                    ${
                        formik.touched.image && formik.errors.image
                            ? "border-red-500 focus-within:ring-red-500 focus-within:border-red-500"
                            : "border-gray-300 focus-within:ring-primary-500 focus-within:border-primary-500"
                    }`}
            >
                <Field
                    id={id}
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="flex-1 px-4 py-3 focus:outline-none"
                />
                {children && (
                    <div className="px-4 flex items-center bg-gray-50 text-gray-500">
                        {children}
                    </div>
                )}
            </div>
            <ErrorMessage
                component={"div"}
                name={name}
                className="text-red-500 text-sm"
            />
            {other && <p className="text-xs text-gray-500 mt-1">{other}</p>}
        </div>
    );
};

export default InputText;
