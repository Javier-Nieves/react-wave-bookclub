import { useState } from "react";

import { RES_PAGE } from "../config";

export default function Search({ totalResults, onSearchBooks, currentView }) {
  const [titleToSearch, setTitleToSearch] = useState("");
  const [page, setPage] = useState(1);

  function searchHandler(e) {
    e.preventDefault();
    onSearchBooks(titleToSearch, page);
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
