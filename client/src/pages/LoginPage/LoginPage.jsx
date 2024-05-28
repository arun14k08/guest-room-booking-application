import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import { MailIcon, PasswordIcon } from "../../assets/SVGAssets";
// import LoginButton from "./components/LoginButton";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState("");
    const {
        setUser,
        ready,
        setReady,
        alert: { setAlertMessage, setAlertType },
    } = useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        setReady(false);
        axios
            .post("/login", {
                email,
                password,
            })
            .then(({ data: { message, type, user } }) => {
                setAlertMessage(message);
                setAlertType(type);
                setUser(user);
                if (type === "success") {
                    setTimeout(() => {
                        if (user.role === "owner") {
                            setRedirect("/dashboard");
                        } else {
                            setRedirect("/");
                        }
                    }, 1000);
                }
            })
            .catch((err) => {
                let alertText =
                    "Server is not responding, refresh and try again";
                if (err.response) {
                    alertText = err.response.data.message;
                }
                setAlertMessage(alertText);
                setAlertType("error");
            })
            .finally(() => {
                setReady(true);
            });
    };
    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <>
            <div className="flex gap-4 items-center justify-center mt-24">
                <form
                    method="post"
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
                    <button
                        type="submit"
                        onClick={(event) => {
                            setReady(true);
                            handleSubmit(event);
                        }}
                        disabled={!ready}
                        style={{
                            backgroundColor: `${!ready ? "#aaa" : "#EB1A40"}`,
                        }}
                        className="px-4 py-2 text-white rounded-lg cursor-pointer h-fit"
                    >
                        Login
                    </button>
                    <p>
                        Don&#39;t have an account?
                        <Link to={"/register"} className="underline">
                            Register here
                        </Link>
                    </p>
                </form>
                <div className="flex flex-col gap-1 justify-around bg-slate-200 py-2 px-4 rounded-lg">
                    <h3 className="text-center text-3xl font-bold font-dance">
                        Demo Users
                    </h3>
                    <div className="px-4 py-2 rounded-lg">
                        <h2 className="text-center text-xl font-semibold">
                            Owner
                        </h2>
                        <ul className="flex flex-col gap-1">
                            <li className="flex gap-1 items-center">
                                <MailIcon /> owner@demo.com
                            </li>
                            <li className="flex gap-1 items-center">
                                <PasswordIcon /> demo
                            </li>
                        </ul>
                    </div>
                    <hr className="bg-black h-[2px]"/>
                    <div className="px-4 py-2 rounded-lg">
                        <h2 className="text-center text-xl font-semibold">
                            Customer
                        </h2>
                        <ul className="flex flex-col gap-1">
                            <li className="flex gap-1 items-center">
                                <MailIcon /> customer@demo.com
                            </li>
                            <li className="flex gap-1 items-center">
                                <PasswordIcon /> demo
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
