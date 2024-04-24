import { useState, useRef, useEffect } from "react";

import { useBooks } from "../Contexts/BooksContext";
import { RES_PAGE } from "../config";

export default function Search() {
  const { currentView, totalResults, searchBooks } = useBooks();

  const [titleToSearch, setTitleToSearch] = useState("");
  const [page, setPage] = useState(1);
  const searchInput = useRef(null);

  useEffect(function () {
    function callback(e) {
      if (document.activeElement === searchInput.current) return;
      if (e.code === "Enter") {
        searchInput.current.focus();
        searchInput.current.value = "";
      }
    }
    document.addEventListener("keydown", callback);
    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, []);

  function searchHandler(e) {
    e.preventDefault();
    searchBooks(titleToSearch, page);
    currentView !== "search" && setTitleToSearch("");
  }

  return (
    <div id="search-field-container">
      <form className="search-form" onSubmit={searchHandler}>
        <input
          type="text"
          className="searchField"
          placeholder="Search for books"
          required
          value={titleToSearch}
          onChange={(e) => setTitleToSearch(e.target.value)}
          ref={searchInput}
        />
        <button className="searchBtn">Search</button>
      </form>
      {currentView === "search" && (
        <div className="flex-column" id="searchInfo">
          <div className="paginationText"> Total results: {totalResults}</div>
        </div>
      )}
    </div>
  );
}
