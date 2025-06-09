
export default function Admin() {
    return (
        <div className="admin-container">
            <h1>Admin Dashboard</h1>
            <p>Welcome to the admin dashboard. Here you can manage users, view reports, and perform administrative tasks.</p>
            <div className="admin-actions">
                <button className="admin-button">Manage Users</button>
                <button className="admin-button">View Reports</button>
                <button className="admin-button">Settings</button>
            </div>
        </div>
    );
}