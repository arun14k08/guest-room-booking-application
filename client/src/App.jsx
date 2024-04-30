import { RouterProvider } from "react-router";
import { Router } from "./Router";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.withCredentials = true;

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
