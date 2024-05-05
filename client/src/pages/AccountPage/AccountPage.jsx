import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import axios from "axios";
import { Navigate } from "react-router";
import Modal from "../../components/Modals/Modal";
import LogoutModal from "./components/LogoutModal";

const AccountPage = () => {
    const {
        user,
        setUser,
        alert: { setAlertType, setAlertMessage },
    } = useContext(UserContext);

    const [redirect, setRedirect] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    setIsModalOpen(true);
                }}
                className="px-4 py-2 text-white rounded-lg cursor-pointer h-fit bg-primary mx-auto"
            >
                Logout
            </button>
            <Modal open={isModalOpen} setOpen={setIsModalOpen}>
                <div>
                    <LogoutModal setIsModalOpen={setIsModalOpen} handleLogout={handleLogout} />
                </div>
            </Modal>
        </div>
    );
};

export default AccountPage;
