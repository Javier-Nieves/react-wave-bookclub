import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

import { SITE_URL, CLASSIC_LIMIT } from "../config";

const BooksContext = createContext();

function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [bookToShow, setBookToShow] = useState(null);
  const upcomingBook = books.find((book) => book.upcoming === true);

  const defaultStyle =
    upcomingBook?.year < CLASSIC_LIMIT ? "modern" : "classic";
  const [currentView, setCurrentView] = useState(
    defaultStyle
    // "history"
    // "modern"
    // "book"
    // "search"
  );

  // getting initial books
  useEffect(function () {
    async function getAllBooks() {
      setLoadingBooks(true);
      const res = await axios({
        method: "GET",
        url: `${SITE_URL}api/v1/books/`,
      });
      if (res.data.status === "success") {
        setBooks(res.data.data.books.sort((a, b) => a.year - b.year));
      }
      setLoadingBooks(false);
    }
    getAllBooks();
  }, []);

  function showBook(book) {
    setBookToShow(book);
    setCurrentView("book");
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
        showBook,
        setCurrentView,
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
