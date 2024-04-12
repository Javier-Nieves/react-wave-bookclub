import { useState, useEffect } from "react";
import axios from "axios";

import { SITE_URL, COUNTRIES_API, CLASSIC_LIMIT } from "../config";
import { searchBooks } from "../helpers";
import { BookView, BookTitle, BookStats, BookDescription } from "./BookView";
import { Navbar, NavButton } from "./Navbar";
import Search from "./Search";
import Upcoming from "./Upcoming";
import Controls from "./Controls";
import Switch from "./Switch";
import Table from "./Table";
import Loader from "./Loader";

export default function App() {
  const [books, setBooks] = useState([]);
  const [countries, setCountries] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingCountries, setLoadingCountries] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
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

  // checking user status
  // todo - create isLoggedIn. UseEffect to check this on mount. Store club's name and create books with it
  useEffect(function () {
    async function checkLogin() {
      console.log("checking...");
      const res = await axios({
        method: "GET",
        url: `${SITE_URL}api/v1/users/logged-check`,
      });
      console.log("login check: ", res);
    }
    checkLogin();
  }, []);

  //! LOGIN!
  // useEffect(function () {
  //   async function login() {
  //     const data = {
  //       name: "wave",
  //       password: "...you know",
  //     };
  //     const res = await axios({
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       url: `${SITE_URL}api/v1/users/login`,
  //       credentials: "include",
  //       data,
  //     });
  //     console.log("LOGIN!", res);
  //   }
  //   login();
  // }, []);

  // getting initial books
  useEffect(function () {
    async function getAllBooks() {
      setLoadingBooks(true);
      const res = await axios({
        method: "GET",
        url: `${SITE_URL}api/v1/books/`,
      });
      if (res.data.status === "success") {
        setBooks(res.data.data.books);
      }
      setLoadingBooks(false);
    }
    getAllBooks();
  }, []);

  // getting initial countries list (for flags and book origin selector)
  useEffect(function () {
    async function getCountryList() {
      // todo - catchAsync
      try {
        setLoadingCountries(true);
        const res = await fetch(COUNTRIES_API);
        const data = await res.json();
        setCountries(
          data.map((item) => {
            if (item.name.common === "United States") item.name.common = "USA";
            if (item.name.common === "United Kingdom") item.name.common = "UK";
            return item;
          })
        );
      } catch (err) {
        console.error("Error in country list API", err.message);
      } finally {
        setLoadingCountries(false);
      }
    }
    getCountryList();
  }, []);

  function handleShowBook(book) {
    setBookToShow(book);
    setCurrentView("book");
  }

  async function handleSearchBooks(title, page) {
    // todo - catchAsync
    const { results, total } = await searchBooks(title, page);
    setTotalResults(total);
    if (!results) return;
    setCurrentView("search");
    setSearchResults(results);
  }

  return (
    <>
      <div
        id="main-view"
        style={{ backgroundImage: `url(/img/${currentView}-back.jpg)` }}
      >
        <div className="main-left-part">
          <Navbar>
            <NavButton onSwitchView={setCurrentView} linkTo={defaultStyle}>
              Reading List
            </NavButton>
            <NavButton onSwitchView={setCurrentView} linkTo={"history"}>
              History
            </NavButton>
          </Navbar>

          <Search
            onSearchBooks={handleSearchBooks}
            currentView={currentView}
            totalResults={totalResults}
          />

          {(currentView === "modern" ||
            currentView === "classic" ||
            currentView === "history") && (
            <Upcoming
              upcomingBook={upcomingBook}
              onChooseBook={handleShowBook}
            />
          )}

          {currentView === "book" && (
            <Controls
              book={bookToShow}
              upcomingBook={upcomingBook}
              books={books}
              // onBooklistChange={setBooks}
            />
          )}
        </div>

        <div className="main-right-part">
          <Switch currentView={currentView} onSwitchView={setCurrentView} />

          {(loadingBooks || loadingCountries) && <Loader />}
          {currentView !== "book" && !loadingBooks && !loadingCountries && (
            <Table
              books={
                currentView === "search"
                  ? searchResults
                  : books.sort((a, b) => a.year - b.year)
              }
              onChooseBook={handleShowBook}
              tableType={currentView}
              countries={countries}
            />
          )}

          {currentView === "book" && (
            <BookView bookToShow={bookToShow}>
              <BookTitle book={bookToShow} />
              <BookStats book={bookToShow} />
              <BookDescription book={bookToShow} />
            </BookView>
          )}
        </div>
      </div>
    </>
  );
}
