export default function Controls({ book, upcomingBook, books }) {
  if (book.read)
    return (
      <>
        <Cover book={book} />
        <Rating rating={book.rating} />
      </>
    );
  if (book.upcoming)
    return (
      <div className="control-group">
        <Cover book={book} />
        <RateBook />
      </div>
    );

  return (
    <div className="control-group">
      <Cover book={book} />

      {books.some((b) => b === book) ? (
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

function Cover({ book }) {
  return (
    <img
      className="view-image"
      src={book.image_link}
      alt="Book Cover"
      loading="lazy"
    />
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
