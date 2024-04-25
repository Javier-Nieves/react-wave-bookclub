import { useBooks } from "../Contexts/BooksContext";
import { SearchRow } from "./TableRow";

export default function SearchTable() {
  const { searchResults } = useBooks();

  return (
    <table id={`searchTable`}>
      <thead>
        <tr className={`search-head`}>
          <th className="cl0 Up">Book</th>
          <th>Title</th>
          <th className="cl1 Up">Author</th>
        </tr>
      </thead>

      <tbody className={`search-table`}>
        {searchResults.map((book) => (
          <SearchRow book={book} key={book.bookid} />
        ))}
      </tbody>
    </table>
  );
}
