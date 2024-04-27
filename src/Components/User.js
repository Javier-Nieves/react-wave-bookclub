import { useAuth } from "../Contexts/AuthContext";

function User() {
  const { isLoggedIn, user, login, logout } = useAuth();

  //! !!!LOGIN
  function handleLogin() {}

  return (
    <div className="enter-container">
      <div className="flex-container">
        {isLoggedIn && (
          <>
            <div className="name-text">
              {user.at(0).toUpperCase() + user.slice(1)} Bookclub
            </div>
            <button className="exit-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}
        {!isLoggedIn && (
          <button className="enter-btn" onClick={handleLogin}>
            Enter your Bookclub
          </button>
        )}
      </div>
    </div>
  );
}

export default User;
