import { useEffect, useState } from "react";
import API from "../api/api";

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data || []);
    } catch {
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id: number) => {
    await API.put(`/tasks/${id}`);
    fetchTasks();
  };

  const deleteTask = async (id: number) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={styles.container}>
      <h2>📝 Tasks</h2>

      <div style={styles.row}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add task..."
          style={styles.input}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.map((t) => (
        <div key={t.id} style={styles.task}>
          <span onClick={() => toggleTask(t.id)}>
            {t.title}
          </span>
          <button onClick={() => deleteTask(t.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  row: { display: "flex", gap: "10px", marginBottom: "20px" },
  input: { flex: 1, padding: "10px" },
  task: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
};