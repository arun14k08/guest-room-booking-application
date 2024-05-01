import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate } from "react-router";

const DashBoard = () => {
    const { user } = useContext(UserContext);
    const [redirect, setRedirect] = useState("");
    const addNewPlace = () => {
        setRedirect("/places/new");
    };

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    if (!user) {
        return <Navigate to={"/"} />;
    }
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="px-8 mt-8 w-full justify-end">
                <button
                    onClick={() => {
                        addNewPlace();
                    }}
                    className="button ml-auto"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                    Add a new Place
                </button>
            </div>
            <div>Places List</div>
        </div>
    );
};

export default DashBoard;
