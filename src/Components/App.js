import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../Pages/AppLayout";
import NotFound from "../Pages/NotFound";
import { ReadingTable, HistoryTable, SearchTable } from "./TableTypes";
import Book from "./BookView";
import Loader from "../Components/Loader";

export default function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // checking user status
  // todo - create isLoggedIn. UseEffect to check this on mount. Store club's name and create books with it
  // useEffect(function () {
  //   async function checkLogin() {
  //     console.log("checking...");
  //     const res = await axios({
  //       method: "GET",
  //       url: `${SITE_URL}api/v1/users/logged-check`,
  //     });
  //     console.log("login check: ", res);
  //   }
  //   checkLogin();
  // }, []);

  //! LOGIN!
  // useEffect(function () {
  //   async function login() {
  //     const data = {
  //       name: "wave",
  //       password: "...you know",
  //     };
  //     const res = await axios({
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       url: `${SITE_URL}api/v1/users/login`,
  //       credentials: "include",
  //       data,
  //     });
  //     console.log("LOGIN!", res);
  //   }
  //   login();
  // }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="app" element={<AppLayout />}>
            <Route path="reading" element={<h1>Main List</h1>} />
            <Route path="classic" element={<ReadingTable period="classic" />} />
            <Route path="modern" element={<ReadingTable period="modern" />} />
            <Route path="history" element={<HistoryTable />} />
            <Route path="search" element={<SearchTable />} />
            <Route path="book/:id" element={<Book />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
