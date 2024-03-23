import { useState } from "react";

import { mockBooks } from "../booklist";
import Navbar from "./Navbar";
import Search from "./Search";
import Upcoming from "./Upcoming";
import Controls from "./Controls";
import Switch from "./Switch";
import Table from "./Table";

let initialBooks = mockBooks;
export const classicLimit = new Date().getFullYear() - 50;

export default function App() {
  const [books, setBooks] = useState(initialBooks);
  const upcomingBook = books.find((book) => book.upcoming === true);
  const [currentView, setCurrentView] = useState(
    // upcomingBook?.year < classicLimit ? "modern" : "classic"
    "history"
    // "modern"
  );

  return (
    <>
      <div
        id="main-view"
        style={{ backgroundImage: `url(/img/${currentView}-back.jpg)` }}
      >
        <div className="main-left-part">
          <Navbar currentView={currentView} />
          <Search />
          <Upcoming upcomingBook={upcomingBook} />
          <Controls />
        </div>
        <div className="main-right-part">
          <Switch currentView={currentView} onSwitchView={setCurrentView} />
          <Table
            books={books.sort((a, b) => a.year - b.year)}
            tableType={currentView}
          />
        </div>
      </div>
    </>
  );
}
