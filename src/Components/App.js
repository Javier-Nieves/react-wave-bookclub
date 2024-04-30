import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useBooks } from "../Contexts/BooksContext";

import { ReadingTable, HistoryTable, SearchTable } from "./TableTypes";
import ProtectedRoutes from "../Pages/ProtectedRoutes";
import Book from "./BookView";
import Loader from "./Loader";

import AppLayout from "../Pages/AppLayout";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import NotFound from "../Pages/NotFound";

export default function App() {
  const { defaultStyle } = useBooks();

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route
            path="app"
            element={
              <ProtectedRoutes>
                <AppLayout />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Navigate replace to={defaultStyle} />} />
            <Route path="classic" element={<ReadingTable period="classic" />} />
            <Route path="modern" element={<ReadingTable period="modern" />} />
            <Route path="history" element={<HistoryTable />} />
            (// todo - add search query param)
            <Route path="search" element={<SearchTable />} />
            <Route path="book/:id" element={<Book />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
