import React from "react";
import { RouterProvider } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

const App = () => {
    return (
        <>
            <div>
                <RouterProvider
                    router={Router}
                    fallbackElement={"Loading..."}
                />
            </div>
        </>
    );
};

export default App;
