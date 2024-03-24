import { useState } from "react";

import { mockBooks } from "../booklist";
import { CLASSIC_LIMIT } from "../config";
import { countries } from "../helpers";
import Navbar from "./Navbar";
import Search from "./Search";
import Upcoming from "./Upcoming";
import Controls from "./Controls";
import Switch from "./Switch";
import Table from "./Table";
import BookView from "./BookView";

let initialBooks = mockBooks;
export const classicLimit = new Date().getFullYear() - 50;

export default function App() {
  const [books, setBooks] = useState(initialBooks);
  const [bookToShow, setBookToShow] = useState(null);
  const upcomingBook = books.find((book) => book.upcoming === true);
  // const upcomingBook = false;
  const defaultStyle =
    upcomingBook?.year < CLASSIC_LIMIT ? "modern" : "classic";
  const [currentView, setCurrentView] = useState(
    defaultStyle
    // "history"
    // "modern"
    // "book"
  );

  function handleShowBook(book) {
    setBookToShow(book);
    setCurrentView("book");
  }

  return (
    <>
      <div
        id="main-view"
        style={{ backgroundImage: `url(/img/${currentView}-back.jpg)` }}
      >
        <div className="main-left-part">
          <Navbar
            currentView={currentView}
            onSwitchView={setCurrentView}
            defaultStyle={defaultStyle}
          />

          <Search />

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
            />
          )}
        </div>

        <div className="main-right-part">
          <Switch currentView={currentView} onSwitchView={setCurrentView} />

          {currentView !== "book" && (
            <Table
              books={books.sort((a, b) => a.year - b.year)}
              onChooseBook={handleShowBook}
              tableType={currentView}
              countries={countries}
            />
          )}

          {currentView === "book" && <BookView book={bookToShow} />}
        </div>
      </div>
    </>
  );
}
