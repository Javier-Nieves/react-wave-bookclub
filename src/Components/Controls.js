import { useBooks } from "../Contexts/BooksContext";

export default function Controls() {
  const { bookToShow, upcomingBook, books } = useBooks();

  if (!bookToShow) return;

  if (bookToShow.read)
    return (
      <>
        <Cover image={bookToShow.image_link} />
        {bookToShow.rating && <Rating rating={bookToShow.rating} />}
      </>
    );
  if (bookToShow.upcoming)
    return (
      <div className="control-group">
        <Cover image={bookToShow.image_link} />
        <RateBook />
      </div>
    );

  return (
    <div className="control-group">
      <Cover image={bookToShow.image_link} />

      {books.some((b) => b === bookToShow) ? (
        <>
          <button className="remove-btn">Remove from the reading list</button>
          {!upcomingBook && <button className="next-btn">Next</button>}
        </>
      ) : (
        <button className="add-btn">To the Reading List</button>
      )}
    </div>
  );
}

function Cover({ image }) {
  return (
    <img className="view-image" src={image} alt="Book Cover" loading="lazy" />
  );
}

function Rating({ rating }) {
  return (
    <>
      <div className="upcom-text">Club's rating:</div>
      <button className="view-rating">{rating}</button>
    </>
  );
}

function RateBook() {
  return (
    <div className="rate-btn-container">
      <div className="upcom-text">Reading now</div>
      <button className="rate-btn">Rate</button>
    </div>
  );
}
