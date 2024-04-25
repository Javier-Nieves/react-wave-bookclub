import { Outlet } from "react-router-dom";

import { useBooks } from "../Contexts/BooksContext";
import { useCountries } from "../Contexts/CountriesContext";

import Loader from "../Components/Loader";

export default function RightColumn() {
  const { loadingBooks } = useBooks();
  const { loadingCountries } = useCountries();

  return (
    <div className="main-right-part">
      {(loadingBooks || loadingCountries) && <Loader />}
      <Outlet />
    </div>
  );
}
