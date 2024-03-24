import { CLASSIC_LIMIT } from "../config";
import { TableRow, TableRowYear } from "./TableRow";

export default function Table({ books, onChooseBook, tableType, countries }) {
  let yearChange;
  return (
    <table id={`${tableType}Table`}>
      <thead>
        <tr className={`${tableType}-head`}>
          <th className="cl0 Up">Book</th>
          <th className="cl1 Up">Author</th>
          <th className="cl2 Up">Year</th>
          <th className="cl3 Up">Country</th>
          <th className="cl4 Up">Pages</th>
          {tableType === "history" && <th className="cl5 Up">Rating</th>}
        </tr>
      </thead>
      <tbody className={`${tableType}-table`}>
        {tableType === "classic" &&
          books.map(
            (book) =>
              book.year < CLASSIC_LIMIT &&
              !book.read && (
                <TableRow
                  book={book}
                  onChooseBook={onChooseBook}
                  key={book.bookid}
                  tableType={tableType}
                  countries={countries}
                />
              )
          )}

        {tableType === "modern" &&
          books.map(
            (book) =>
              book.year > CLASSIC_LIMIT &&
              !book.read && (
                <TableRow
                  book={book}
                  onChooseBook={onChooseBook}
                  key={book.bookid}
                  tableType={tableType}
                  countries={countries}
                />
              )
          )}

        {tableType === "history" &&
          books
            .sort((a, b) => new Date(b.meeting_date) - new Date(a.meeting_date))
            .map((book) => {
              if (!book.read) return false;
              if (!yearChange) yearChange = book.meeting_date?.slice(0, 4);
              if (book.meeting_date?.slice(0, 4) !== yearChange) {
                yearChange = book.meeting_date?.slice(0, 4);
                // render Year Row and Book row together
                return (
                  <>
                    <TableRowYear yearChange={yearChange} key={yearChange} />
                    <TableRow
                      book={book}
                      onChooseBook={onChooseBook}
                      key={book.bookid}
                      tableType={tableType}
                      countries={countries}
                    />
                  </>
                );
              }
              yearChange = book.meeting_date?.slice(0, 4);
              // render just book row if it's from the same year
              return (
                <TableRow
                  book={book}
                  onChooseBook={onChooseBook}
                  key={book.bookid}
                  tableType={tableType}
                  countries={countries}
                />
              );
            })}
      </tbody>
    </table>
  );
}
