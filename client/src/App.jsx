import { RouterProvider } from "react-router";
import { Router } from "./Router";
import axios from "axios";
import UserContextProvider from "./context/UserContextProvider";
import PlaceCardsShimmer from "./pages/HomePage/components/PlaceCardsShimmer";
import { Suspense } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
const App = () => {
    return (
        <div className="w-full px-8 py-2">
            <Suspense fallback={<PlaceCardsShimmer />}>
                <UserContextProvider>
                    <RouterProvider
                        router={Router}
                        fallbackElement={<PlaceCardsShimmer />}
                    />
                </UserContextProvider>
            </Suspense>
        </div>
    );
};

export default App;
