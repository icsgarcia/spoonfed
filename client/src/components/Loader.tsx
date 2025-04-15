import { CSSProperties } from "react";
import MoonLoader from "react-spinners/MoonLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "green",
};

export const Loader = ({ loading }: { loading: boolean }) => {
    return (
        <>
            <MoonLoader
                role="status"
                loading={loading}
                cssOverride={override}
                color="green"
                size={150}
            />
        </>
    );
};

export default Loader;
