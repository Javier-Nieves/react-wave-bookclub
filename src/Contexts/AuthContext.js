import {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import axios from "axios";

import { SITE_URL } from "../config";

const AuthContext = createContext();

const initialState = {
  user: null,
  isLoggedIn: false,
  loadingLogin: false,
  error: null,
  jwt: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loadingLogin: true };
    case "login":
      localStorage.setItem("jwt", action.payload.jwt);
      return {
        ...state,
        isLoggedIn: true,
        loadingLogin: false,
        user: action.payload.user,
        jwt: action.payload.jwt,
      };
    case "restoreToken":
      return { ...state, jwt: action.payload };
    case "userIsAuthenticated":
      return {
        ...state,
        user: action.payload.data.currentUser.name,
        isLoggedIn: true,
        loadingLogin: false,
      };
    case "logout":
      localStorage.removeItem("jwt");
      return { ...state, isLoggedIn: false, user: null, jwt: null };
    case "rejected":
      return { ...state, loadingBooks: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isLoggedIn, loadingLogin, jwt }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // 1) initial login check
  useEffect(
    function () {
      async function checkAuth() {
        dispatch({ type: "loading" });
        try {
          // check LocalStarage for jwt token. In case of page refresh
          const savedJwt = localStorage.getItem("jwt");
          if (savedJwt) dispatch({ type: "restoreToken", payload: savedJwt });

          const res = await axios({
            method: "POST",
            url: `${SITE_URL}api/v1/users/logged-check`,
            data: { token: jwt },
          });
          if (res.data.status === "success") {
            dispatch({
              type: "userIsAuthenticated",
              payload: res.data,
            });
          }
        } catch {
          dispatch({
            type: "rejected",
            payload: "Error while checking login!",
          });
        }
      }
      checkAuth();
    },
    [jwt]
  );

  const login = useCallback(
    async function login(name, password) {
      if (user === name) return;
      dispatch({ type: "loading" });
      const data = {
        name,
        password,
      };
      const res = await axios({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        url: `${SITE_URL}api/v1/users/login`,
        //   credentials: "include",
        data,
      });
      if (res.data.status === "success") {
        dispatch({
          type: "login",
          payload: { user: name, jwt: res.data.token },
        });
      }
    },
    [user]
  );

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, loadingLogin, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context used outside of the Provider");
  return context;
}

export { AuthProvider, useAuth };
