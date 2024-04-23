import { useState, useEffect } from "react";

import { useBooks } from "../Contexts/BooksContext";
import { useCountries } from "../Contexts/CountriesContext";

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
  const { currentView, loadingBooks, setCurrentView } = useBooks();
  const { loadingCountries } = useCountries();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  // checking user status
  // todo - create isLoggedIn. UseEffect to check this on mount. Store club's name and create books with it
  // useEffect(function () {
  //   async function checkLogin() {
  //     console.log("checking...");
  //     const res = await axios({
  //       method: "GET",
  //       url: `${SITE_URL}api/v1/users/logged-check`,
  //     });
  //     console.log("login check: ", res);
  //   }
  //   checkLogin();
  // }, []);

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
            <NavButton>Reading List</NavButton>
            <NavButton linkTo={"history"}>History</NavButton>
          </Navbar>

          <Search
            onSearchBooks={handleSearchBooks}
            totalResults={totalResults}
          />

          {(currentView === "modern" ||
            currentView === "classic" ||
            currentView === "history") && <Upcoming />}

          {currentView === "book" && <Controls />}
        </div>

        <div className="main-right-part">
          <Switch />

          {(loadingBooks || loadingCountries) && <Loader />}
          {currentView !== "book" && !loadingBooks && !loadingCountries && (
            <Table searchResults={searchResults} />
          )}

          {currentView === "book" && (
            <BookView>
              <BookTitle />
              <BookStats />
              <BookDescription />
            </BookView>
          )}
        </div>
      </div>
    </>
  );
}
