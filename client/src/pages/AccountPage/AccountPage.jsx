import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import axios from "axios";
import { Navigate } from "react-router";
import Modal from "../../components/Modals/Modal";
import LogoutModal from "./components/LogoutModal";
import UserBookings from "./components/UserBookings";
import BookingsShimmer from "./components/BookingsShimmer";

const AccountPage = () => {
    const {
        user,
        setUser,
        alert: { setAlertType, setAlertMessage },
    } = useContext(UserContext);

    const [redirect, setRedirect] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        axios
            .post("/logout")
            .then((response) => {
                const { data } = response;
                setAlertType(data.type);
                setAlertMessage(data.message);
                setUser(null);
                setRedirect("/");
            })
            .catch((err) => {
                {
                    let alertText =
                        "Server is not responding, refresh and try again";
                    if (err.response) {
                        alertText = err.response.data.message;
                    }
                    setAlertMessage(alertText);
                    setAlertType("error");
                }
            });
    };

    if (!user) {
        return <Navigate to="/" />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="flex flex-col gap-4">
            <button
                onClick={() => {
                    setIsModalOpen(true);
                }}
                className="px-4 py-2 text-white rounded-lg cursor-pointer h-fit bg-primary ml-auto"
            >
                Logout
            </button>
            <Modal open={isModalOpen} setOpen={setIsModalOpen}>
                <div>
                    <LogoutModal
                        setIsModalOpen={setIsModalOpen}
                        handleLogout={handleLogout}
                    />
                </div>
            </Modal>
            {`Welcome  ${user?.name}`}

            <div>{user?.role === "customer" && <UserBookings />}</div>
        </div>
    );
};

export default AccountPage;
