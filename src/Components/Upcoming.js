export default function Upcoming({ upcomingBook }) {
  return (
    <div
      className="upcoming-book-container dataContainer"
      data-year={upcomingBook.year}
      data-bookid={upcomingBook.bookid}
    >
      <div className="upcoming-container">
        <h1 id="upcoming-title">{upcomingBook.title}</h1>
        <h3 id="upcoming-autor">
          {upcomingBook.author}, {upcomingBook.year}
        </h3>
        <img
          id="upcoming-pic"
          src={upcomingBook.image_link}
          loading="lazy"
          alt="upcomming book"
        />
      </div>
      <div id="upcoming-date">Meeting date:</div>
      <form className="add-date-container">
        <div className="meeting-date"></div>
        <input type="date" className="meetingField" required />
        <button className="meetingBtn">Add date</button>
      </form>
    </div>
  );
}
