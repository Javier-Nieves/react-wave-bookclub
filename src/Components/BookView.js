import { useEffect } from "react";

export function BookView({ bookToShow, children }) {
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

export function BookTitle({ book }) {
  return <h1 className="view-title">{book.title}</h1>;
}

export function BookStats({ book }) {
  return (
    <div className="book-info-top" style={{ gap: "10px" }}>
      <h2 className="view-author">
        {book.author}
        {book.year ? `, ${book.year}` : ""}
      </h2>
      <div className="book-info-top" style={{ gap: "10px" }}>
        <div className="view-pages">Pages: {book.pages}</div>
      </div>
      <button className="edit-btn">Edit</button>
      <button className="save-btn">Save</button>
    </div>
  );
}

export function BookDescription({ book }) {
  return (
    <div
      className="view-desc"
      dangerouslySetInnerHTML={{ __html: book.desc }}
    />
  );
}
