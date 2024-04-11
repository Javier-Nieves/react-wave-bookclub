export function TableRow({ book, onChooseBook, tableType, countries }) {
  const bookCountry = countries.find((c) => c.name.common === book.country);
  return (
    <tr
      className={`table-row ${tableType}-body`}
      onClick={() => onChooseBook(book)}
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
      {tableType === "history" && <td className="cl5">{book.rating}</td>}
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

export function SearchRow({ book, onChooseBook }) {
  return (
    <tr className={`table-row modern-body`} onClick={() => onChooseBook(book)}>
      <td className="cl0">
        <img className="small-pic" src={book.image_link} alt="book cover" />
      </td>
      <td className="searchResultBig">{book.title}</td>
      <td className="searchResultSmall">{book.author}</td>
    </tr>
  );
}
