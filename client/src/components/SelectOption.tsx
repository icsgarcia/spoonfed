import { ErrorMessage, Field } from "formik";
import { ReactNode } from "react";

interface SelectOptionProps {
    formik: any;
    htmlFor: string;
    label: string;
    id: string;
    name: string;
    children: ReactNode;
}

const SelectOption = ({
    formik,
    htmlFor,
    label,
    id,
    name,
    children,
}: SelectOptionProps) => {
    return (
        <div className="space-y-1.5">
            <label
                htmlFor={htmlFor}
                className="block text-sm font-medium text-gray-700"
            >
                {label}*
            </label>
            <Field
                as="select"
                id={id}
                name={name}
                className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.difficulty && formik.errors.difficulty
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } focus:outline-none`}
            >
                {children}
            </Field>
            <ErrorMessage
                component={"div"}
                name={name}
                className="text-red-500 text-sm"
            />
        </div>
    );
};

export default SelectOption;
