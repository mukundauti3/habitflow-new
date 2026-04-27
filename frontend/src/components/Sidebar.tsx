import { useNavigate, useLocation } from "react-router-dom";
import { CSSProperties } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Tasks", path: "/tasks", icon: "📝" },
    { name: "Journal", path: "/journal", icon: "📘" },
    { name: "Habits", path: "/habits", icon: "🔥" },
  ];

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>HabitFlow 🚀</h2>

      {menu.map((item) => (
        <div
          key={item.path}
          style={{
            ...styles.item,
            background:
              location.pathname === item.path
                ? "rgba(255,255,255,0.2)"
                : "transparent",
          }}
          onClick={() => navigate(item.path)}
        >
          <span>{item.icon}</span>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "linear-gradient(180deg, #667eea, #764ba2)",
    color: "white",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0,
  },
  logo: {
    marginBottom: "30px",
  },
  item: {
    display: "flex",
    gap: "10px",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "10px",
  },
};