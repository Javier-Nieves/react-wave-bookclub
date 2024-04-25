import { useBooks } from "../Contexts/BooksContext";

export default function Main({ children }) {
  const { currentView } = useBooks();
  return (
    <div
      id="main-view"
      style={{ backgroundImage: `url(/img/${currentView}-back.jpg)` }}
    >
      {children}
    </div>
  );
}
