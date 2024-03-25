export function Navbar({ children }) {
  return <div className="navbar">{children}</div>;
}

export function NavButton({ children, onSwitchView, linkTo }) {
  return (
    <button
      id="reading-link"
      className={`link brand-modern`}
      onClick={() => onSwitchView(linkTo)}
    >
      {children}
    </button>
  );
}
