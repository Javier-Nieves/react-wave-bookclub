import { useNavigate } from "react-router-dom";
import { useBooks } from "../Contexts/BooksContext";

export default function Upcoming() {
  const { upcomingBook } = useBooks();
  const navigate = useNavigate();
  return (
    <div
      className="upcoming-book-container dataContainer"
      onClick={() =>
        upcomingBook && navigate(`/app/book/${upcomingBook.bookid}`)
      }
    >
      <div className="upcoming-container">
        <h1 id="upcoming-title">
          {upcomingBook?.title || "Choose the next book"}
        </h1>
        {upcomingBook && (
          <h3 id="upcoming-autor">
            {upcomingBook?.author}, {upcomingBook.year}
          </h3>
        )}
        <img
          id="upcoming-pic"
          src={upcomingBook?.image_link || "/img/club2.png"}
          loading="lazy"
          alt="upcoming book"
        />
      </div>

      {upcomingBook && (
        <>
          <div id="upcoming-date">Meeting date:</div>
          <form className="add-date-container">
            <div className="meeting-date"></div>
            <input type="date" className="meetingField" required />
            <button className="meetingBtn">Add date</button>
          </form>
        </>
      )}
    </div>
  );
}
