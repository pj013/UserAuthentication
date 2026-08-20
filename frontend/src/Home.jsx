import { useState } from "react";
import Login from "./login";
import Register from "./register";
import Dashboard from "./Dashboard";

function Home() {
    const [page, setPage] = useState("home");
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
        setPage("dashboard");
    };

    const handleLogout = () => {
        setUser(null);
        setPage("home");
    };

    if (page === "login") {
        return (
            <Login
                onLogin={handleLogin}
                onBack={() => setPage("home")}
            />
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

    if (page === "dashboard") {
        return (
            <Dashboard
                user={user}
                onLogout={handleLogout}
            />
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