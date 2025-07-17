import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [allocations, setAllocations] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllocations = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin-login");
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:5000/api/allocation/admin/allocations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (res.ok) setAllocations(data);
        else setError(data.message || "Failed to fetch allocations");
      } catch {
        setError("Error fetching allocations");
      }
    };

    fetchAllocations();
  }, [navigate]);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(
        `http://localhost:5000/api/allocation/admin/allocations/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setAllocations((prev) =>
          prev.map((item) => (item._id === id ? { ...item, status } : item))
        );
        alert(`Allocation ${status}`);
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch {
      alert("Error updating allocation status");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#007bff", color: "white" }}>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Series</th>
            <th>Hall Choice</th>
            <th>Allocated Room</th>
            <th>Section</th>
            <th>Profile</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allocations.length ? (
            allocations.map((a) => {
              // Debug log for profilePhoto
              // console.log("Profile photo for", a.studentId, a.profilePhoto);

              return (
                <tr key={a._id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td>{a.studentId}</td>
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td>{a.series}</td>
                  <td>{a.hallChoice}</td>
                  <td>{a.allocatedRoom || "N/A"}</td>
                  <td>{a.section}</td>
                  <td>
                    {a.profilePhoto ? (
                      <img
                        src={a.profilePhoto}
                        alt="Profile"
                        style={{
                          width: 60,
                          height: 50,
                          borderRadius: 10,
                          objectFit: "cover",
                          border: "1px solid #ccc",
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      "No Pic"
                    )}
                  </td>

                  <td
                    style={{
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {a.status}
                  </td>
                  <td>
                    <button
                      onClick={() => updateStatus(a._id, "approved")}
                      disabled={a.status !== "pending"}
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        marginRight: 5,
                        padding: "6px 10px",
                        border: "none",
                        borderRadius: 4,
                        cursor:
                          a.status === "pending" ? "pointer" : "not-allowed",
                      }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(a._id, "rejected")}
                      disabled={a.status !== "pending"}
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "6px 10px",
                        border: "none",
                        borderRadius: 4,
                        cursor:
                          a.status === "pending" ? "pointer" : "not-allowed",
                      }}
                    >
                      Deny
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={10} style={{ textAlign: "center", padding: 20 }}>
                No allocation requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

