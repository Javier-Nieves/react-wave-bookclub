import { useEffect } from "react";
import { useBooks } from "../Contexts/BooksContext";

export function BookView({ children }) {
  const { bookToShow } = useBooks();
  console.log("display: ", bookToShow);
  //changing tab title
  useEffect(
    function () {
      if (!bookToShow) return;
      document.title = "Wave bookclub | " + bookToShow.title;

      // cleanup function
      return function () {
        document.title = "Wave bookclub";
      };
    },
    [bookToShow]
  );

  return (
    <div id="book-view" className="book-info">
      {children}
    </div>
  );
}

export function BookTitle() {
  const { bookToShow } = useBooks();
  return <h1 className="view-title">{bookToShow.title}</h1>;
}

export function BookStats() {
  const { bookToShow } = useBooks();
  return (
    <div className="book-info-top" style={{ gap: "10px" }}>
      <h2 className="view-author">
        {bookToShow.author}
        {bookToShow.year ? `, ${bookToShow.year}` : ""}
      </h2>
      <div className="book-info-top" style={{ gap: "10px" }}>
        <div className="view-pages">Pages: {bookToShow.pages}</div>
      </div>
      <button className="edit-btn">Edit</button>
      <button className="save-btn">Save</button>
    </div>
  );
}

export function BookDescription() {
  const { bookToShow } = useBooks();
  return (
    <div
      className="view-desc"
      dangerouslySetInnerHTML={{ __html: bookToShow.desc }}
    />
  );
}
