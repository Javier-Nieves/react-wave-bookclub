import { useBooks } from "../Contexts/BooksContext";

function Main({ children }) {
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
function LeftColumn({ children }) {
  return <div className="main-left-part">{children}</div>;
}
function RightColumn({ children }) {
  return <div className="main-right-part">{children}</div>;
}

export { Main, LeftColumn, RightColumn };
