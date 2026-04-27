import Sidebar from "./Sidebar";
import { CSSProperties } from "react";

export default function Layout({ children }: any) {
  return (
    <div style={styles.wrapper}>
      <Sidebar />

      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  wrapper: {
    display: "flex",
  },
  content: {
    marginLeft: "220px",
    padding: "30px",
    width: "100%",
    minHeight: "100vh",
    background: "#f5f6fa",
  },
};