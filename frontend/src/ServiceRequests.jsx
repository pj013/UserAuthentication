import { useEffect, useState } from "react";

function ServiceRequests({ onBack, onLogout }) {
    const [requests, setRequests] = useState([]);
    const [message, setMessage] = useState("");

    // Create form
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    // Edit form
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editCategory, setEditCategory] = useState("");

    // Get user's service requests
    const fetchRequests = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                "http://localhost:8080/api/requests",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch requests");
            }

            const data = await response.json();
            setRequests(data);

        } catch (error) {
            setMessage("Failed to load service requests.");
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // Create service request
    const handleCreate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                "http://localhost:8080/api/requests",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: title,
                        description: description,
                        category: category,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to create request");
            }

            setMessage("Service request created successfully!");

            // Clear form
            setTitle("");
            setDescription("");
            setCategory("");

            // Refresh request list
            fetchRequests();

        } catch (error) {
            setMessage("Failed to create service request.");
        }
    };

    // Update service request
    const handleEdit = async (id) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:8080/api/requests/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title: editTitle,
                        description: editDescription,
                        category: editCategory,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update request");
            }

            setMessage("Service request updated successfully!");

            // Exit edit mode
            setEditingId(null);

            // Refresh request list
            fetchRequests();

        } catch (error) {
            setMessage("Failed to update service request.");
        }
    };

    // Delete service request
    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:8080/api/requests/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete request");
            }

            setMessage("Service request deleted successfully!");

            // Refresh request list
            fetchRequests();

        } catch (error) {
            setMessage("Failed to delete service request.");
        }
    };

    return (
        <div>
            {/* Navigation buttons */}
            <button onClick={onBack}>
                ← Back to Dashboard
            </button>

            <button onClick={onLogout}>
                Logout
            </button>

            <h1>My Service Requests</h1>

            {/* Success/Error Message */}
            {message && <p>{message}</p>}

            {/* Create Request Form */}
            <h2>Add Service Request</h2>

            <form onSubmit={handleCreate}>

                <div>
                    <label>Title</label>
                    <br />

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Description</label>
                    <br />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                        required
                    />
                </div>

                <br />

                <div>
                    <label>Category</label>
                    <br />

                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter category"
                        required
                    />
                </div>

                <br />

                <button type="submit">
                    Add Request
                </button>

            </form>

            <hr />

            {/* Request List */}
            <h2>My Requests</h2>

            {requests.length === 0 ? (
                <p>No service requests found.</p>
            ) : (
                requests.map((request) => (
                    <div key={request.id}>

                        {editingId === request.id ? (

                            /* Edit Form */
                            <div>
                                <h3>Edit Service Request</h3>

                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) =>
                                        setEditTitle(e.target.value)
                                    }
                                />

                                <br />
                                <br />

                                <textarea
                                    value={editDescription}
                                    onChange={(e) =>
                                        setEditDescription(e.target.value)
                                    }
                                />

                                <br />
                                <br />

                                <input
                                    type="text"
                                    value={editCategory}
                                    onChange={(e) =>
                                        setEditCategory(e.target.value)
                                    }
                                />

                                <br />
                                <br />

                                <button
                                    onClick={() =>
                                        handleEdit(request.id)
                                    }
                                >
                                    Save Changes
                                </button>

                                <button
                                    onClick={() =>
                                        setEditingId(null)
                                    }
                                >
                                    Cancel
                                </button>
                            </div>

                        ) : (

                            /* Request Display */
                            <div>
                                <h3>{request.title}</h3>

                                <p>
                                    <strong>Description:</strong>{" "}
                                    {request.description}
                                </p>

                                <p>
                                    <strong>Category:</strong>{" "}
                                    {request.category}
                                </p>

                                <p>
                                    <strong>Date Created:</strong>{" "}
                                    {request.dateCreated}
                                </p>

                                <button
                                    onClick={() => {
                                        setEditingId(request.id);
                                        setEditTitle(request.title);
                                        setEditDescription(
                                            request.description
                                        );
                                        setEditCategory(
                                            request.category
                                        );
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(request.id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        )}

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default ServiceRequests;