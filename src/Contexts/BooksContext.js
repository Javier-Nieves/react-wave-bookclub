import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import axios from "axios";

import { SITE_URL, CLASSIC_LIMIT, BOOK_API } from "../config";
import { getSearchedBooks, AJAX, makeUniformedBook } from "../helpers";

const BooksContext = createContext();

const initialState = {
  books: [],
  bookToShow: undefined,
  loadingBooks: false,
  upcomingBook: {},
  searchResults: [],
  totalResults: 0,
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
      };
    case "book/loaded":
      return {
        ...state,
        bookToShow: action.payload,
        loadingBooks: false,
        currentView: "book",
      };
    case "search/completed":
      return {
        ...state,
        loadingBooks: false,
        currentView: "search",
        totalResults: action.payload.total,
        searchResults: action.payload.results,
      };
    case "changeView":
      return { ...state, currentView: action.payload, bookToShow: undefined };
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
      searchResults,
      totalResults,
      defaultStyle,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  // 1) getting initial books
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

  // 2) Books from the search field
  async function searchBooks(title, page) {
    dispatch({ type: "loading" });
    const searchResults = await getSearchedBooks(title, page);
    if (!searchResults) return;
    dispatch({ type: "search/completed", payload: searchResults });
  }

  // 3) One Book data is received. Also checking if it's already in the DB
  const showBook = useCallback(
    async function showBook(id) {
      if (bookToShow !== undefined) return;
      dispatch({ type: "loading" });
      try {
        // looking for the book in the DB:
        const bookInDb = books.find((book) => book.bookid === id);
        let bookFromApi;
        // if it's not in the DB - look in the web api
        if (bookInDb === undefined) {
          const response = await AJAX(`${BOOK_API}/${id}`);
          bookFromApi = makeUniformedBook(response);
        }
        dispatch({ type: "book/loaded", payload: bookInDb || bookFromApi });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Error while fetching book data!",
        });
      }
    },
    [bookToShow, books]
  );

  const changeView = useCallback(function changeView(view) {
    dispatch({ type: "changeView", payload: view });
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        loadingBooks,
        bookToShow,
        upcomingBook,
        searchResults,
        totalResults,
        currentView,
        defaultStyle,
        error,
        showBook,
        searchBooks,
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
