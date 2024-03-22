export let books = [];

(function createBookList() {
  for (let i = 1; i < 10; i++) {
    books.push({
      bookid: `${i}`,
      club: "wave",
      title: `Book${i}`,
      author: `Author${i}`,
      country: `Country${i}`,
      pages: `${i}${i}${i}`,
      desc: `${i}${i}${i}${i}Desc${i}${i}${i}`,
      image_link: `someLink${i}`,
      year: `${i}${i}${i}${i}`,
      read: false,
      upcoming: false,
      rating: 9,
      meeting_date: `${i}0-${i}${i}-20${i}${i}`,
    });
  }
  books.push({
    bookid: `13`,
    club: "wave",
    title: `Book13`,
    author: `Author13`,
    country: `Country13`,
    pages: `133`,
    desc: `13131313Desc131313`,
    image_link: `img/club2.png`,
    year: `2013`,
    read: false,
    upcoming: true,
    rating: 9,
    meeting_date: `130-1313-201313`,
  });
})();

// const books = [
//   {
//     bookid: "1",
//     club: "wave",
//     title: "Book1",
//     author: "Author1",
//     country: "Country1",
//     pages: 111,
//     desc: "1111Desc111",
//     image_link: "someLink1",
//     year: 1111,
//     read: false,
//     upcoming: false,
//     rating: 9,
//     meeting_date: "10-11-2011",
//   },
// ];
