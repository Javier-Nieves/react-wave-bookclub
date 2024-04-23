import { useBooks } from "../Contexts/BooksContext";
import { useCountries } from "../Contexts/CountriesContext";

export function TableRow({ book }) {
  const { showBook, currentView } = useBooks();
  const { countries } = useCountries();

  const bookCountry = countries.find((c) => c.name.common === book.country);
  return (
    <tr
      className={`table-row ${currentView}-body`}
      onClick={() => showBook(book)}
    >
      <td className="cl0">{book.title}</td>
      <td className="cl1">{book.author}</td>
      <td className="cl2">{book.year}</td>
      <td className="cl3" data-country={book.country}>
        <div className="flagContainer">
          <div>{book.country}</div>
          <img src={bookCountry?.flags.svg} className="smallFlag" alt="flag" />
        </div>
      </td>
      <td className="cl4">{book.pages}</td>
      {currentView === "history" && <td className="cl5">{book.rating}</td>}
    </tr>
  );
}

export function TableRowYear({ yearChange }) {
  return (
    <tr className="yearRow">
      <td>{yearChange}</td>
      <td />
      <td />
      <td />
      <td />
      <td />
    </tr>
  );
}

export function SearchRow({ book }) {
  const { showBook } = useBooks();
  return (
    <tr className={`table-row modern-body`} onClick={() => showBook(book)}>
      <td className="cl0">
        <img className="small-pic" src={book.image_link} alt="book cover" />
      </td>
      <td className="searchResultBig">{book.title}</td>
      <td className="searchResultSmall">{book.author}</td>
    </tr>
  );
}
