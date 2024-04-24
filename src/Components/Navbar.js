import { useBooks } from "../Contexts/BooksContext";

export function Navbar({ children }) {
  return <div className="navbar">{children}</div>;
}

export function NavButton({ children, linkTo }) {
  const { changeView, defaultStyle } = useBooks();
  return (
    <button
      id="reading-link"
      className={`link brand-modern`}
      onClick={() => changeView(linkTo || defaultStyle)}
    >
      {children}
    </button>
  );
}
