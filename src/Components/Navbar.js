export default function Navbar({ currentView, onSwitchView, defaultStyle }) {
  return (
    <div className="navbar">
      <NavButton
        currentView={currentView}
        onSwitchView={onSwitchView}
        linkTo={defaultStyle}
      >
        Reading List
      </NavButton>
      <NavButton
        currentView={currentView}
        onSwitchView={onSwitchView}
        linkTo={"history"}
      >
        History
      </NavButton>
    </div>
  );
}

function NavButton({ children, currentView, onSwitchView, linkTo }) {
  return (
    <button
      id="reading-link"
      // className={`link brand-${currentView}`}
      className={`link brand-modern`}
      onClick={() => onSwitchView(linkTo)}
    >
      {children}
    </button>
  );
}
