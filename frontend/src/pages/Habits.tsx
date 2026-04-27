import { useEffect, useState } from "react";
import API from "../api/api";

export default function Habits() {
  const [habits, setHabits] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  const fetchHabits = async () => {
    const res = await API.get("/habits");
    setHabits(res.data || []);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const addHabit = async () => {
    if (!title.trim()) return;
    await API.post("/habits", { title });
    setTitle("");
    fetchHabits();
  };

  const toggleHabit = async (id: number) => {
    await API.put(`/habits/${id}`);
    fetchHabits();
  };

  const deleteHabit = async (id: number) => {
    await API.delete(`/habits/${id}`);
    fetchHabits();
  };

  return (
    <div style={styles.container}>
      <h2>🔥 Habits</h2>

      <div style={styles.row}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New habit"
        />
        <button onClick={addHabit}>Add</button>
      </div>

      {habits.map((h) => (
        <div key={h.id} style={styles.habit}>
          <span onClick={() => toggleHabit(h.id)}>
            {h.title}
          </span>
          <button onClick={() => deleteHabit(h.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  row: { display: "flex", gap: "10px", marginBottom: "20px" },
  habit: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
};