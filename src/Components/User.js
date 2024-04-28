import { useAuth } from "../Contexts/AuthContext";
import Button from "./Button";

function User() {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <div className="enter-container">
      <div className="flex-container">
        {isLoggedIn && (
          <>
            <div className="name-text">
              {user.name.at(0).toUpperCase() + user.name.slice(1)} Bookclub
            </div>
            <Button type="enter-btn" onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default User;
