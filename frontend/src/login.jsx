import { useState } from "react";

function Login({ onLogin, onBack }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password length:", password.length);

    try {
        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.trim(),
                password: password,
            }),
        });

        const data = await response.json();

        console.log("Status:", response.status);
        console.log("Response:", data);

        if (!response.ok) {
            throw new Error("Login failed");
        }

        console.log("Login successful:", data);

        localStorage.setItem("token", data.token);

        onLogin(data);

    } catch (error) {
        console.error("Login error:", error);
        setMessage("Invalid email or password.");
    }
};
    return (
        <div>
            <button onClick={onBack}>
                ← Back
            </button>

            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;