import { useAuth } from "../Contexts/AuthContext";
import Button from "./Button";

import styles from "./User.module.css";

function User() {
  const { isLoggedIn, user, logout } = useAuth();
  return (
    <div className={styles.enterContainer}>
      {isLoggedIn && (
        <>
          <div className={styles.nameText}>
            {user.name.at(0).toUpperCase() + user.name.slice(1)} Bookclub
          </div>
          <Button type="enter-btn" onClick={logout}>
            Logout
          </Button>
        </>
      )}
    </div>
  );
}

export default User;
