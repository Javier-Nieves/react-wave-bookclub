import { useNavigate } from "react-router-dom";
import { useBooks } from "../Contexts/BooksContext";
import { RateBookBlock } from "./RateBookBlock";
import Button from "./Button";

import styles from "./Main.module.css";

export default function Controls() {
  const { bookToShow, upcomingBook, books, nextBook } = useBooks();
  const navigate = useNavigate();

  if (!bookToShow) return;

  async function handleNextBook() {
    await nextBook();
    navigate("/app");
  }

  if (bookToShow.read)
    return (
      <>
        <Cover image={bookToShow.image_link} />
        {bookToShow.rating && <Rating rating={bookToShow.rating} />}
      </>
    );
  if (bookToShow.upcoming)
    return (
      <div className={styles.controlGroup}>
        <Cover image={bookToShow.image_link} />
        <RateBookBlock />
      </div>
    );

  return (
    <div className={styles.controlGroup}>
      <Cover image={bookToShow.image_link} />

      {books.some((b) => b === bookToShow) ? (
        <>
          <Button type="removeBtn">Remove from the reading list</Button>
          {!upcomingBook && (
            <Button type="nextBtn" onClick={handleNextBook}>
              Next
            </Button>
          )}
        </>
      ) : (
        <Button type="addBtn">To the Reading List</Button>
      )}
    </div>
  );
}

function Cover({ image }) {
  return (
    <img
      className={styles.viewImage}
      src={image}
      alt="Book Cover"
      loading="lazy"
    />
  );
}

function Rating({ rating }) {
  return (
    <>
      <div className={styles.upcomText}>Club's rating:</div>
      <button className={styles.viewRating}>{rating}</button>
    </>
  );
}
