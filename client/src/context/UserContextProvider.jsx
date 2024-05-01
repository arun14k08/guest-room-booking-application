import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

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
        <UserContext.Provider value={{ user, setUser, ready, setReady }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
