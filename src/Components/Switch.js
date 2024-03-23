export default function Switch({ currentView, onSwitchView }) {
  return (
    <div className="switch-container">
      {(currentView === "modern" || currentView === "classic") && (
        <button
          className="switch"
          style={{ backgroundImage: `url("img/${currentView}.png")` }}
          onClick={() =>
            onSwitchView(currentView === "classic" ? "modern" : "classic")
          }
        />
      )}
      {currentView === "history" && (
        <img
          src={"img/club2.png"}
          className="history__wave-logo"
          alt="wave-logo"
        />
      )}
      {/* <img src='{% static "bookclub/121.gif" %}' className="switch-back" /> */}
    </div>
  );
}
