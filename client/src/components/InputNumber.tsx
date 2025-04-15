import { ErrorMessage, Field } from "formik";

interface InputNumberProps {
    formik: any;
    htmlFor: string;
    label: string;
    id: string;
    name: string;
}

const InputNumber = ({
    formik,
    htmlFor,
    label,
    id,
    name,
}: InputNumberProps) => {
    return (
        <div className="space-y-1.5">
            <label
                htmlFor={htmlFor}
                className="block text-sm font-medium text-gray-700"
            >
                {label}*
            </label>
            <Field
                id={id}
                type="number"
                name={name}
                min="1"
                className={`w-full px-4 py-3 rounded-lg border ${
                    formik.touched.servings && formik.errors.servings
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                } focus:outline-none`}
            />
            <ErrorMessage
                component={"div"}
                name={name}
                className="text-red-500 text-sm"
            />
        </div>
    );
};

export default InputNumber;
