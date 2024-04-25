import { Outlet } from "react-router-dom";
// prettier-ignore
import { BookView, BookTitle, BookStats, BookDescription } from "../Components/BookView";

import { useBooks } from "../Contexts/BooksContext";
import { useCountries } from "../Contexts/CountriesContext";

import Loader from "../Components/Loader";

export default function RightColumn() {
  const { currentView, loadingBooks } = useBooks();
  const { loadingCountries } = useCountries();

  return (
    <div className="main-right-part">
      {/*  */}
      {(loadingBooks || loadingCountries) && <Loader />}
      <Outlet />
      {/* {currentView !== "book" && !loadingBooks && !loadingCountries && (
        <Table />
      )}
      {currentView === "book" && (
        <BookView>
          <BookTitle />
          <BookStats />
          <BookDescription />
        </BookView>
      )} */}
    </div>
  );
}
