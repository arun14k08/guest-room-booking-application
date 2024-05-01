import { RouterProvider } from "react-router";
import { Router } from "./Router";
import axios from "axios";
import UserContextProvider from "./context/UserContextProvider";

axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.withCredentials = true;

const App = () => {
    return (
        <UserContextProvider>
            <RouterProvider router={Router} fallbackElement={"Loading..."} />
        </UserContextProvider>
    );
};

export default App;
