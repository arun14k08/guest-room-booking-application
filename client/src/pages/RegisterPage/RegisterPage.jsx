import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("customer");
    const {
        ready,
        setReady,
        alert: { setAlertMessage, setAlertType },
    } = useContext(UserContext);
    // submitting form data to register a new user
    const handleSubmit = (event) => {
        event.preventDefault();
        setReady(false);
        axios
            .post("/register", {
                name,
                email,
                phone,
                password,
                role,
            })
            .then((response) => {
                console.log(response.data);
                setAlertMessage(response.data.message);
                setAlertType(response.data.type);
            })
            .catch((error) => {
                console.log(error);
                setAlertMessage(error.response.data.message);
                setAlertType("error");
            })
            .finally(() => {
                setReady(true);
            });
    };
    return (
        <div className="flex flex-col items-center justify-center gap-2 mt-24">
            <form
                method="post"
                onSubmit={(event) => handleSubmit(event)}
                className="flex flex-col justify-center gap-2 bg-slate-200 px-6 py-4 rounded-lg"
            >
                <h2 className="text-bold text-[32px] text-center font-dance">
                    Register
                </h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value.toUpperCase())
                    }
                    required
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(event) =>
                        setEmail(event.target.value.toLowerCase())
                    }
                    required
                />
                <input
                    type="number"
                    placeholder="Mobile number"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                />
                <select
                    name="role"
                    onChange={(event) => {
                        setRole(event.target.value);
                    }}
                    value={role}
                    required
                >
                    <option value="customer">Customer</option>
                    <option value="owner">House Owner</option>
                </select>
                <input
                    type="password"
                    value={password}
                    placeholder="Enter a new Password"
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <button
                    type="submit"
                    style={{
                        backgroundColor: `${!ready ? "#aaa" : "#EB1A40"}`,
                    }}
                    className="px-4 py-2 text-white rounded-lg cursor-pointer h-fit"
                    disabled={!ready}
                >
                    Register
                </button>
                <p>
                    Already have an account?{" "}
                    <Link to={"/login"} className="underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
