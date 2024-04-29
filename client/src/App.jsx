import { RouterProvider } from "react-router";
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
