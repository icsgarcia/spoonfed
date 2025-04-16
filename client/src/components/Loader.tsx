import MoonLoader from "react-spinners/MoonLoader";

export const Loader = ({
    loading,
    color = "green",
    text,
}: {
    loading: boolean;
    color?: string;
    text?: string;
}) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-2">
            <MoonLoader
                role="status"
                loading={loading}
                color={color}
                size={150}
            />
            <p className="text-primary-800">{text}</p>
        </div>
    );
};

export default Loader;
