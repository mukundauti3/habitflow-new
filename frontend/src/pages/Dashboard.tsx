import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CSSProperties } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");

    // ✅ get user
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2>Dashboard 👋</h2>

        {/* ✅ PROFILE */}
        <div style={styles.profile}>
          <div>
            <p style={styles.name}>{user?.name || "User"}</p>
            <p style={styles.email}>{user?.email}</p>
          </div>

          <button style={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Cards */}
      <div style={styles.grid}>
        <div style={styles.card} onClick={() => navigate("/tasks")}>
          📝 Tasks
        </div>

        <div style={styles.card} onClick={() => navigate("/journal")}>
          📘 Journal
        </div>

        <div style={styles.card} onClick={() => navigate("/habits")}>
          🔥 Habits
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  profile: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "#f5f6fa",
    padding: "10px 15px",
    borderRadius: "10px",
  },
  name: {
    fontWeight: "600",
  },
  email: {
    fontSize: "12px",
    color: "gray",
  },
  logout: {
    background: "#ff4d4d",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "30px",
    background: "white",
    borderRadius: "10px",
    cursor: "pointer",
    textAlign: "center",
    boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
  },
};