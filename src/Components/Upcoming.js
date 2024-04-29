import { useNavigate } from "react-router-dom";
import { useBooks } from "../Contexts/BooksContext";
import { CLASSIC_LIMIT } from "../config";

import styles from "./Upcoming.module.css";

export default function Upcoming() {
  const { upcomingBook } = useBooks();
  const navigate = useNavigate();

  const isModern = upcomingBook?.year > CLASSIC_LIMIT;
  let fontSize;
  if (isModern)
    fontSize = upcomingBook?.title?.length > 15 ? "2.5rem" : "3.5rem";
  else fontSize = upcomingBook?.title?.length > 15 ? "2.5rem" : "3.5rem";
  const fontFamily = isModern ? "var(--font-modern)" : "var(--font-classic)";
  return (
    <div
      className={isModern ? styles.modernBack : styles.classicBack}
      style={{
        fontFamily,
      }}
      onClick={() =>
        upcomingBook && navigate(`/app/book/${upcomingBook.bookid}`)
      }
    >
      <div>
        <h1
          className={styles.upcomingTitle}
          style={{
            fontSize,
            fontFamily,
          }}
        >
          {upcomingBook?.title || "Choose the next book"}
        </h1>
        {upcomingBook && (
          <h3
            style={{
              fontSize: upcomingBook?.author?.length > 12 ? "1.5rem" : "2rem",
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
