import { useState } from "react";
import { books } from "../booklist";
import { Navbar } from "./Navbar";
import { Search } from "./Search";
import { Upcoming } from "./Upcoming";
import { Controls } from "./Controls";

let initialBooks = books;

export default function App() {
  const [books, setBooks] = useState(initialBooks);

  const upcomingBook = books.find((book) => book.upcoming === true);

  return (
    <>
      <div id="main-view">
        <div className="main-left-part">
          <Navbar />
          <Search />
          <Upcoming upcomingBook={upcomingBook} />
          <Controls />
        </div>
        <div className="main-right-part">
          <Switch />
          <Table books={books} />
        </div>
      </div>
    </>
  );
}

function Switch() {
  return (
    <div class="switch-container">
      <button class="switch"></button>
      {/* <img src='{% static "bookclub/121.gif" %}' class="switch-back" /> */}
    </div>
  );
}
function Table() {
  return <div>TODO</div>;
}
