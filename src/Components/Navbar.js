export default function Navbar({ currentView }) {
  return (
    <div className="navbar">
      <button id="reading-link" className={`link brand-${currentView}`}>
        Reading List
      </button>
      <button id="history-link" className={`link brand-${currentView}`}>
        History
      </button>
    </div>
  );
}
