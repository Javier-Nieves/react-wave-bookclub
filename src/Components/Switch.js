import { NavLink } from "react-router-dom";

export default function Switch({ period = undefined }) {
  return (
    <div className="switch-container">
      {(period === "modern" || period === "classic") && (
        <NavLink
          to={period === "classic" ? "/app/modern" : "/app/classic"}
          className="switch"
          style={{ backgroundImage: `url("/img/${period}.png")` }}
        />
      )}
      {period !== "classic" && period !== "modern" && (
        <img
          src={"/img/club2.png"}
          className="history__wave-logo"
          alt="wave-logo"
        />
      )}
      {/* <img src='{% static "bookclub/121.gif" %}' className="switch-back" /> */}
    </div>
  );
}
