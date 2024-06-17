import { RouterProvider } from "react-router";
import { Router } from "./Router";
import axios from "axios";
import UserContextProvider from "./context/UserContextProvider";
import LoadingSpinner from "./components/Spinner/LoadingSpinner";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers = ["Content-Type", "application/json"];

const App = () => {
    return (
        <div className="w-full px-8 py-2">
            <UserContextProvider>
                <RouterProvider
                    router={Router}
                    fallbackElement={<LoadingSpinner />}
                />
            </UserContextProvider>
        </div>
    );
};

export default App;
