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

    useEffect(() => {
        let { setAlertMessage, setAlertType } = alert;
        if (!setAlertMessage || !setAlertType) return;
        const alertThreshold = 6000;
        setTimeout(() => {
            setAlertMessage("");
            setAlertType("");
        }, alertThreshold);
    }, [alert]);

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
            <div className="fixed rounded-lg top-24 right-8 shadow-xl overflow-hidden z-10 transition-all">
                {alertMessage ? (
                    <Alert variant="filled" severity={alertType}>
                        {alertMessage}
                    </Alert>
                ) : null}
            </div>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
