import { useBooks } from "../Contexts/BooksContext";

export default function Switch() {
  const { changeView, currentView } = useBooks();
  return (
    <div className="switch-container">
      {(currentView === "modern" || currentView === "classic") && (
        <button
          className="switch"
          style={{ backgroundImage: `url("img/${currentView}.png")` }}
          onClick={() =>
            changeView(currentView === "classic" ? "modern" : "classic")
          }
        />
      )}
      {(currentView === "history" ||
        currentView === "search" ||
        currentView === "book") && (
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
