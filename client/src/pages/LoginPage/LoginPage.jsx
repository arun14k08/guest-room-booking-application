import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [redirect, setRedirect] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("/v1/login", {
                email,
                password,
            })
            .then(({ data: { message, type } }) => {
                setAlertMessage(message);
                setAlertType(type);
                if (type === "success") {
                    setTimeout(() => {
                        setRedirect(true);
                    }, 1500);
                }
            });
    };
    if (redirect) {
        return <Navigate to={"/"} />;
    }
    return (
        <>
            <div className="flex flex-col gap-2 items-center justify-center mt-24">
                <Alert severity={alertType}>{alertMessage}</Alert>
                <form
                    method="post"
                    onSubmit={() => {
                        handleSubmit(event);
                    }}
                    className="flex flex-col justify-center gap-2 bg-slate-200 px-6 py-4 rounded-lg"
                >
                    <h2 className="text-bold text-[32px] text-center font-dance">
                        Login
                    </h2>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value.toLowerCase())
                        }
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter your Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    <button className="px-4 py-2 text-white rounded-lg cursor-pointer h-fit bg-primary">
                        Login
                    </button>
                    <p>
                        Don&#39;t have an account?
                        <Link to={"/register"} className="underline">
                            Register here
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
