import React from "react";

export const AuthLayout = ({ children }: { children: React.ReactElement }) => {
    return (
        <div className="container h-screen mx-auto flex flex-col items-center justify-center">
            {children}
        </div>
    );
};
