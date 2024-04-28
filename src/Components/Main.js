import { useBooks } from "../Contexts/BooksContext";

import styles from "./Main.module.css";

export default function Main({ children }) {
  const { currentView } = useBooks();
  return (
    <div
      className={styles.mainView}
      style={{
        backgroundImage: ` linear-gradient(
        rgba(55, 55, 55, 0.7),
        rgba(55, 55, 55, 0.7)
      ),
      url(/img/${currentView}-back.jpg)`,
      }}
    >
      {children}
    </div>
  );
}
