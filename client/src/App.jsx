import { RouterProvider } from "react-router";
import { Router } from "./Router";
import axios from "axios";
import UserContextProvider from "./context/UserContextProvider";

axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.withCredentials = true;

const App = () => {
    return (
        <div className="w-full px-8 py-2">
            <UserContextProvider>
                <RouterProvider
                    router={Router}
                    fallbackElement={"Loading..."}
                />
            </UserContextProvider>
        </div>
    );
};

export default App;
