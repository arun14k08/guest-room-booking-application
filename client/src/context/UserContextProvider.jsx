import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext({});
import Alert from "@mui/material/Alert";
const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    const alert = {
        setAlertMessage,
        setAlertType,
    };

    useEffect(() => {
        if (!user) {
            setReady(false);
            axios.get("/profile").then((response) => {
                setUser(response.data);
            });
            setReady(true);
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                ready,
                setReady,
                alert,
            }}
        >
            <div className="fixed rounded-lg top-24 right-8 shadow-xl overflow-hidden z-10">
                {alertMessage ? (
                    <Alert severity={alertType}> {alertMessage} </Alert>
                ) : null}
            </div>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
