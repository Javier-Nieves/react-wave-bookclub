import { useBooks } from "../Contexts/BooksContext";
import { CLASSIC_LIMIT } from "../config";
import { TableRow, TableRowYear, SearchRow } from "./TableRow";

export default function Table({ searchResults }) {
  const { books, currentView } = useBooks();

  let yearChange;
  // console.log("books in table: ", books);
  return (
    <table id={`${currentView}Table`}>
      <thead>
        <tr className={`${currentView}-head`}>
          <th className="cl0 Up">Book</th>
          {currentView === "search" && <th>Title</th>}
          <th className="cl1 Up">Author</th>
          {currentView !== "search" && (
            <>
              <th className="cl2 Up">Year</th>
              <th className="cl3 Up">Country</th>
              <th className="cl4 Up">Pages</th>
            </>
          )}
          {currentView === "history" && <th className="cl5 Up">Rating</th>}
        </tr>
      </thead>

      <tbody className={`${currentView}-table`}>
        {currentView === "classic" &&
          books.map(
            (book) =>
              book.year < CLASSIC_LIMIT &&
              !book.read && <TableRow book={book} key={book.bookid} />
          )}

        {currentView === "modern" &&
          books.map(
            (book) =>
              book.year > CLASSIC_LIMIT &&
              !book.read && <TableRow book={book} key={book.bookid} />
          )}

        {currentView === "search" &&
          searchResults.map((book) => (
            <SearchRow book={book} key={book.bookid} />
          ))}

        {currentView === "history" &&
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
                    <TableRow book={book} key={book.bookid} />
                  </>
                );
              }
              yearChange = book.meeting_date?.slice(0, 4);
              // render just book row if it's from the same year
              return <TableRow book={book} key={book.bookid} />;
            })}
      </tbody>
    </table>
  );
}
