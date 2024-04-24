import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

import { SITE_URL, CLASSIC_LIMIT } from "../config";

const BooksContext = createContext();

const initialState = {
  books: [],
  bookToShow: {},
  loadingBooks: false,
  upcomingBook: {},
  currentView: "modern",
  defaultStyle: "modern",
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loadingBooks: true };
    case "books/loaded":
      // prettier-ignore
      const upcomingBook = action.payload.find((book) => book.upcoming === true);
      // prettier-ignore
      const defaultStyle = upcomingBook.year < CLASSIC_LIMIT ? "modern" : "classic";
      return {
        ...state,
        loadingBooks: false,
        books: action.payload,
        upcomingBook,
        defaultStyle,
        currentView: defaultStyle,
      };
    case "book/loaded":
      return {
        ...state,
        loadingBooks: false,
        bookToShow: action.payload,
        currentView: "book",
      };
    case "changeView":
      return { ...state, currentView: action.payload };
    case "rejected":
      return { ...state, loadingBooks: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

function BooksProvider({ children }) {
  const [
    {
      books,
      bookToShow,
      loadingBooks,
      upcomingBook,
      currentView,
      defaultStyle,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // getting initial books
  useEffect(function () {
    async function getAllBooks() {
      dispatch({ type: "loading" });
      try {
        const res = await axios({
          method: "GET",
          url: `${SITE_URL}api/v1/books/`,
        });
        if (res.data.status === "success") {
          dispatch({
            type: "books/loaded",
            payload: res.data.data.books.sort((a, b) => a.year - b.year),
          });
        }
      } catch {
        dispatch({
          type: "rejected",
          payload: "Error while fetching books data!",
        });
      }
    }
    getAllBooks();
  }, []);

  function showBook(book) {
    console.log("calling for: ", book);
    dispatch({ type: "book/loaded", payload: book });
  }

  function changeView(view) {
    dispatch({ type: "changeView", payload: view });
  }

  return (
    <BooksContext.Provider
      value={{
        books,
        loadingBooks,
        bookToShow,
        upcomingBook,
        currentView,
        defaultStyle,
        error,
        showBook,
        changeView,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}

function useBooks() {
  const context = useContext(BooksContext);
  if (context === undefined)
    throw new Error("Books Context used outside of the provider");
  return context;
}

export { BooksProvider, useBooks };
