import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    // submitting form data to register a new user
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("/v1/register", {
                name,
                email,
                phone,
                password,
            })
            .then((response) => {
                console.log(response.data);
                setAlertMessage(response.data.message);
                setAlertType(response.data.type);
            })
            .catch((error) => console.log(error));
    };
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <Alert severity={alertType}>{alertMessage}</Alert>
            <form
                method="post"
                onSubmit={() => handleSubmit(event)}
                className="flex flex-col justify-center gap-2 bg-slate-200 px-6 py-4 rounded-lg"
            >
                <h2 className="text-bold text-[32px] text-center font-dance">
                    Register
                </h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Mobile number"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                />
                <input
                    type="password"
                    value={password}
                    placeholder="Enter a new Password"
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <p>
                    Already have an account?{" "}
                    <Link to={"/login"} className="underline">
                        Login
                    </Link>
                </p>
                <button
                    type="submit"
                    className="px-4 py-2 text-white rounded-lg cursor-pointer h-fit bg-primary"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
