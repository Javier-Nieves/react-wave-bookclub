import { useState } from "react";

import { mockBooks } from "../booklist";
import { CLASSIC_LIMIT } from "../config";
import { countries, searchBooks } from "../helpers";
import { getAllBooks } from "../model";
import { Navbar, NavButton } from "./Navbar";
import Search from "./Search";
import Upcoming from "./Upcoming";
import Controls from "./Controls";
import Switch from "./Switch";
import Table from "./Table";
import { BookView, BookTitle, BookStats, BookDescription } from "./BookView";

// let initialBooks;
// getInitialBooks();
// let initialBooks = await getAllBooks();
// console.log(resBooks);
export const classicLimit = new Date().getFullYear() - 50;

export default function App() {
  const [books, setBooks] = useState(mockBooks);
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

  // setBooks(initialBooks);

  function handleShowBook(book) {
    setBookToShow(book);
    setCurrentView("book");
  }
  async function handleSearchBooks(title, page) {
    const { results, total } = await searchBooks(title, page);
    // totalResults = total;
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

          {currentView !== "book" && (
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
            <BookView>
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

// async function getInitialBooks() {
//   initialBooks = await getAllBooks();
// }
