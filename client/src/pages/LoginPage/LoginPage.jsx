import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
// import LoginButton from "./components/LoginButton";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    const {
        setUser,
        alert: { setAlertMessage, setAlertType },
    } = useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();
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
            .catch((error) => {
                setAlertMessage("An error occurred. Please try again.");
                setAlertType("error" + error);
            })
            .finally(() => {
                setFormLoading(false);
            });
    };
    if (redirect) {
        return <Navigate to={redirect} />;
    }

    console.log(formLoading);

    return (
        <>
            <div className="flex flex-col gap-2 items-center justify-center mt-24">
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
                            setFormLoading(true);
                            handleSubmit(event);
                        }}
                        disabled={formLoading}
                        style={{
                            backgroundColor: `${
                                formLoading ? "#aaa" : "#EB1A40"
                            }`,
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
            </div>
        </>
    );
};

export default LoginPage;
