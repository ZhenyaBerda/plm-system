import React from "react";
import { BrowserRouter } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

const Router = ({ children }: Props) => {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    );
}

export default Router;
