export default function Search() {
  return (
    <div id="search-field-container">
      <form className="search-form">
        <input
          type="text"
          className="searchField"
          placeholder="Search for books"
        />
        <button className="searchBtn">Search</button>
      </form>
      <div className="flex-column" id="searchInfo"></div>
    </div>
  );
}
