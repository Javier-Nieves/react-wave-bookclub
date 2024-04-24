import { useState } from "react";

import { useBooks } from "../Contexts/BooksContext";
import { useCountries } from "../Contexts/CountriesContext";

import { searchBooks } from "../helpers";
import { BookView, BookTitle, BookStats, BookDescription } from "./BookView";
import { Navbar, NavButton } from "./Navbar";
import { Main, LeftColumn, RightColumn } from "./Main";
import Search from "./Search";
import Upcoming from "./Upcoming";
import Controls from "./Controls";
import Switch from "./Switch";
import Table from "./Table";
import Loader from "./Loader";

export default function App() {
  const { currentView, loadingBooks, changeView } = useBooks();
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
    changeView("search");
    setSearchResults(results);
  }

  return (
    <Main>
      <LeftColumn>
        <Navbar>
          <NavButton>Reading List</NavButton>
          <NavButton linkTo="history">History</NavButton>
        </Navbar>

        <Search onSearchBooks={handleSearchBooks} totalResults={totalResults} />

        {(currentView === "modern" ||
          currentView === "classic" ||
          currentView === "history") && <Upcoming />}

        {currentView === "book" && <Controls />}
      </LeftColumn>

      <RightColumn>
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
      </RightColumn>
    </Main>
  );
}
