import { useState } from "react";
import Login from "./login";
import Register from "./register";

function Home() {
    const [page, setPage] = useState("home");

    if (page === "login") {
        return (
            <div>
                <button onClick={() => setPage("home")}>
                    ← Back
                </button>

                <Login />
            </div>
        );
    }

    if (page === "register") {
        return (
            <div>
                <button onClick={() => setPage("home")}>
                    ← Back
                </button>

                <Register />
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome</h1>
            <p>Please choose an option</p>

            <button onClick={() => setPage("login")}>
                Login
            </button>

            <button onClick={() => setPage("register")}>
                Register
            </button>
        </div>
    );
}

export default Home;