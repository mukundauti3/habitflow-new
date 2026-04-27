import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSSProperties } from "react";
import API from "../api/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // 🔥 loading state
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return; // prevent double click

    // ✅ validation
    if (!name || !email || !password) {
      alert("All fields are required ❌");
      return;
    }

    try {
      setLoading(true);

      console.log("📤 Sending:", { name, email, password });

      const res = await API.post(
        "/auth/register",
        { name, email, password },
        { timeout: 10000 } // 🔥 prevent infinite loading
      );

      console.log("✅ Response:", res.data);

      alert("Register success ✅");
      navigate("/");

    } catch (err: any) {
      console.error("❌ FULL ERROR:", err);

      if (err.response) {
        alert(err.response.data.message || "Register failed ❌");
      } else if (err.code === "ECONNABORTED") {
        alert("⏳ Server timeout (Railway sleeping)");
      } else {
        alert("❌ Backend not reachable");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleRegister}>
        <h2 style={styles.title}>Register</h2>

        <input
          style={styles.input}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} type="submit">
          {loading ? "Registering..." : "Register"}
        </button>

        <p style={styles.link} onClick={() => navigate("/")}>
          Already have account? Login
        </p>
      </form>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "320px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#764ba2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  link: {
    marginTop: "10px",
    color: "#764ba2",
    cursor: "pointer",
  },
};