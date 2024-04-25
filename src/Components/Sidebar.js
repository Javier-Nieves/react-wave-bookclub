import { useBooks } from "../Contexts/BooksContext";
import { Navbar } from "./Navbar";
import Search from "./Search";
import Upcoming from "./Upcoming";
import Controls from "./Controls";

export default function Sidebar() {
  const { currentView } = useBooks();
  return (
    <div className="main-left-part">
      <Navbar />
      <Search />
      {(currentView === "modern" ||
        currentView === "classic" ||
        currentView === "history") && <Upcoming />}
      {currentView === "book" && <Controls />}
    </div>
  );
}
