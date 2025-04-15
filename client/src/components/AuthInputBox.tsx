import { Field, ErrorMessage } from "formik";

interface AuthInputBoxProps {
    htmlFor: string;
    label: string;
    icon: React.ReactNode;
    id: string;
    type: string;
    placeholder: string;
    name: string;
}

const AuthInputBox = ({
    htmlFor,
    label,
    icon,
    id,
    type,
    placeholder,
    name,
}: AuthInputBoxProps) => {
    return (
        <div className="group">
            <label
                htmlFor={htmlFor}
                className="block text-sm font-medium text-text-dark mb-1.5"
            >
                {label}
            </label>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden group-focus-within:ring-2 group-focus-within:ring-primary-500 group-focus-within:border-primary-500">
                <div className="p-3 bg-gray-50 text-gray-500 border-r border-gray-300 flex items-center">
                    {icon}
                </div>
                <Field
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    className=" px-4 py-3 focus:outline-none w-full"
                />
            </div>
            <ErrorMessage
                component={"div"}
                name={name}
                className="text-red-500 mt-1 text-sm"
            />
        </div>
    );
};

export default AuthInputBox;
