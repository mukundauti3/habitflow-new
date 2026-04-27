import { useEffect, useState } from "react";
import API from "../api/api";

export default function Journal() {
  const [entries, setEntries] = useState<any[]>([]);
  const [text, setText] = useState("");

  const fetchData = async () => {
    const res = await API.get("/journal");
    setEntries(res.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addEntry = async () => {
    if (!text.trim()) return;
    await API.post("/journal", { content: text });
    setText("");
    fetchData();
  };

  const deleteEntry = async (id: number) => {
    await API.delete(`/journal/${id}`);
    fetchData();
  };

  return (
    <div style={styles.container}>
      <h2>📘 Journal</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.textarea}
      />

      <button onClick={addEntry}>Add</button>

      {entries.map((e) => (
        <div key={e.id} style={styles.entry}>
          <p>{e.content}</p>
          <button onClick={() => deleteEntry(e.id)}>❌</button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  textarea: {
    width: "100%",
    height: "100px",
    marginBottom: "10px",
  },
  entry: { marginBottom: "10px" },
};