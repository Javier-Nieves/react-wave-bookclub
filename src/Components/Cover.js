export default function Cover({ book }) {
  return <img className="view-image" alt="book cover" src={book.image_link} />;
}
