function Dashboard({ user, onLogout }) {
    return (
        <div>
            <h1>Dashboard</h1>

            <h2>Welcome, {user.username}!</h2>

            <p>Email: {user.email}</p>

            <button onClick={onLogout}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;