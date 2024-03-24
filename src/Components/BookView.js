export default function BookView({ book }) {
  return (
    <div id="book-view" className="book-info">
      <h1 className="view-title">{book.title}</h1>
      <BookStats book={book} />
      <div
        className="view-desc"
        dangerouslySetInnerHTML={{ __html: book.desc }}
      />
    </div>
  );
}

function BookStats({ book }) {
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