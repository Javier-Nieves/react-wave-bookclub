import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBooks } from "../Contexts/BooksContext";
import Switch from "./Switch";

export default function BookView() {
  const { id } = useParams();
  const { bookToShow, showBook, loadingBooks } = useBooks();
  // console.log("showing: ", bookToShow);

  useEffect(
    function () {
      showBook(id);
    },
    [id, showBook]
  );

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

  if (loadingBooks || !bookToShow) return;

  return (
    <>
      <Switch />
      <div id="book-view" className="book-info">
        <BookTitle />
        <BookStats />
        <BookDescription />
      </div>
    </>
  );
}

function BookTitle() {
  const { bookToShow } = useBooks();
  return <h1 className="view-title">{bookToShow.title}</h1>;
}

function BookStats() {
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

function BookDescription() {
  const { bookToShow } = useBooks();
  return (
    <div
      className="view-desc"
      dangerouslySetInnerHTML={{ __html: bookToShow.desc }}
    />
  );
}
