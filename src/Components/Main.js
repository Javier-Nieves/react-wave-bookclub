import { useBooks } from "../Contexts/BooksContext";

import styles from "./Main.module.css";

export default function Main({ children }) {
  const { currentView } = useBooks();
  return (
    <div
      className={styles.mainView}
      style={{
        backgroundImage: ` linear-gradient(
        rgba(36, 42, 46, 0.5),
        rgba(36, 42, 46, 0.5)
      ),
      url(/img/${currentView}-back.jpg)`,
      }}
    >
      {children}
    </div>
  );
}
