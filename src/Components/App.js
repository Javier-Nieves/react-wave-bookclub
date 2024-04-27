import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useBooks } from "../Contexts/BooksContext";

import { ReadingTable, HistoryTable, SearchTable } from "./TableTypes";
import AppLayout from "../Pages/AppLayout";
import NotFound from "../Pages/NotFound";
import Book from "./BookView";
import Loader from "../Components/Loader";

export default function App() {
  const { defaultStyle } = useBooks();

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to={defaultStyle} />} />
            <Route path="classic" element={<ReadingTable period="classic" />} />
            <Route path="modern" element={<ReadingTable period="modern" />} />
            <Route path="history" element={<HistoryTable />} />
            (// todo - add search query param)
            <Route path="search" element={<SearchTable />} />
            <Route path="book/:id" element={<Book />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
