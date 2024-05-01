import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate } from "react-router";

const HomePage = () => {
    const { user } = useContext(UserContext);
    if (user?.role === "owner") {
        return <Navigate to={"/dashboard"} />;
    }
    return <div>HomePage</div>;
};

export default HomePage;
