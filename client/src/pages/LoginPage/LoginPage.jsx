import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/api/login", {
            email,
            password,
        });
    };
    return (
        <>
            <div className="flex items-center justify-center h-[calc(100vh_-_64px)]">
                <form
                    onSubmit={() => {
                        handleSubmit();
                    }}
                    className="flex flex-col justify-center gap-2 bg-slate-200 px-6 py-4 rounded-lg"
                >
                    <h2 className="text-bold text-[32px] text-center font-dance">
                        Login
                    </h2>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter your Password"
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <p>
                        Don&#39;t have an account?
                        <Link to={"/register"} className="underline">
                            Register here
                        </Link>
                    </p>
                    <button className="px-4 py-2 text-white rounded-lg cursor-pointer h-fit bg-primary">
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
