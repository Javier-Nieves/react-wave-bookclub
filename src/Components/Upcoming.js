import { useNavigate } from "react-router-dom";
import { useBooks } from "../Contexts/BooksContext";

import styles from "./Upcoming.module.css";

export default function Upcoming() {
  const { upcomingBook } = useBooks();
  const navigate = useNavigate();
  console.log("length: ", upcomingBook?.title?.length);
  return (
    <div
      className={styles.upcomingBookContainer}
      onClick={() =>
        upcomingBook && navigate(`/app/book/${upcomingBook.bookid}`)
      }
    >
      <div>
        <h1
          className={styles.upcomingTitle}
          style={{
            fontSize: upcomingBook?.title?.length > 12 ? "2.5rem" : "3rem",
          }}
        >
          {upcomingBook?.title || "Choose the next book"}
        </h1>
        {upcomingBook && (
          <h3
            style={{
              fontSize: upcomingBook?.author?.length > 12 ? "1.3rem" : "2rem",
            }}
          >
            {upcomingBook?.author}, {upcomingBook.year}
          </h3>
        )}
        <img
          className={styles.upcomingPic}
          src={upcomingBook?.image_link || "/img/club2.png"}
          loading="lazy"
          alt="upcoming book"
        />
      </div>

      {upcomingBook && (
        <>
          <div id="upcoming-date">Meeting date:</div>
          <form className={styles.addDateContainer}>
            <div className="meeting-date"></div>
            <input type="date" className="meetingField" required />
            <button className="meetingBtn">Add date</button>
          </form>
        </>
      )}
    </div>
  );
}
