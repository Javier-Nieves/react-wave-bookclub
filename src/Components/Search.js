import { useState } from "react";

export default function Search({ total, onSearchBooks }) {
  const [titleToSearch, setTitleToSearch] = useState("");
  // TODO use State to control pagination

  function searchHandler(e) {
    e.preventDefault();
    onSearchBooks(titleToSearch);
    setTitleToSearch("");
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
      <div className="flex-column" id="searchInfo">
        {/* <div class="paginationText"> Total results: {total}</div> */}
      </div>
    </div>
  );
}
