import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import axios from "axios";
import { Navigate } from "react-router";

const AccountPage = () => {
    const {
        user,
        setUser,
        alert: { setAlertType, setAlertMessage },
    } = useContext(UserContext);
    const [redirect, setRedirect] = useState("");
    const handleLogout = () => {
        axios.post("/logout").then((response) => {
            const { data } = response;
            setAlertType(data.type);
            setAlertMessage(data.message);
            setUser(null);
            setRedirect("/");
        });
    };

    if (!user) {
        return <Navigate to="/" />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="flex flex-col">
            {`Welcome  ${user?.name}`}
            <button
                onClick={() => {
                    handleLogout();
                }}
                className="px-4 py-2 text-white rounded-lg cursor-pointer h-fit bg-primary mx-auto"
            >
                Logout
            </button>
        </div>
    );
};

export default AccountPage;
