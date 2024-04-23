import { useBooks } from "../Contexts/BooksContext";

export function Navbar({ children }) {
  return <div className="navbar">{children}</div>;
}

export function NavButton({ children, linkTo }) {
  const { setCurrentView, defaultStyle } = useBooks();
  return (
    <button
      id="reading-link"
      className={`link brand-modern`}
      onClick={() => setCurrentView(linkTo || defaultStyle)}
    >
      {children}
    </button>
  );
}
