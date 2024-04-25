import { useBooks } from "../Contexts/BooksContext";
import { TableRow, TableRowYear } from "./TableRow";

export default function HistoryTable() {
  const { books } = useBooks();

  let yearChange;
  return (
    <table id={`historyTable`}>
      <thead>
        <tr className={`history-head`}>
          <th className="cl0 Up">Book</th>
          <th className="cl1 Up">Author</th>
          <th className="cl2 Up">Year</th>
          <th className="cl3 Up">Country</th>
          <th className="cl4 Up">Pages</th>
          <th className="cl5 Up">Rating</th>
        </tr>
      </thead>

      <tbody className={`history-table`}>
        {books
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
