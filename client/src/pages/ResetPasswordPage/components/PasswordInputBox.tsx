import { ErrorMessage, Field } from "formik";
import { FaLock } from "react-icons/fa6";

interface PasswordInputBoxProps {
    htmlFor: string;
    label: string;
    id: string;
    placeholder: string;
    name: string;
}

const PasswordInputBox = ({
    htmlFor,
    label,
    id,
    placeholder,
    name,
}: PasswordInputBoxProps) => {
    return (
        <div className="group">
            <label
                htmlFor={htmlFor}
                className="block text-sm font-medium text-gray-700 mb-1.5"
            >
                {label}
            </label>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden group-focus-within:ring-2 group-focus-within:ring-primary-500 group-focus-within:border-primary-500">
                <div className="p-3 bg-gray-50 text-gray-500 border-r border-gray-300 flex items-center">
                    <FaLock />
                </div>
                <Field
                    id={id}
                    type="password"
                    placeholder={placeholder}
                    name={name}
                    className="px-4 py-3 focus:outline-none w-full"
                />
            </div>
            <ErrorMessage
                component="div"
                name={name}
                className="text-red-600 text-sm"
            />
        </div>
    );
};

export default PasswordInputBox;
