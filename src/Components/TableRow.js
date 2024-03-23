export function TableRow({ book, tableType }) {
  return (
    <tr
      className={`table-row ${tableType}-body dataContainer`}
      data-bookid={book.bookid}
    >
      <td className="cl0">{book.title}</td>
      <td className="cl1">{book.author}</td>
      <td className="cl2">{book.year}</td>
      <td className="cl3" data-country="UK">
        <div className="flagContainer">
          <div>{book.country}</div>
          <img
            src="https://flagcdn.com/w320/gb.png"
            className="smallFlag"
            alt="flag"
          />
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
