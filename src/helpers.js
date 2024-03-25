import { COUNTRIES_API, TIMEOUT_SEC, RES_PAGE, BOOK_API } from "./config.js";

export let countries = [];
await getCountryList();

async function getCountryList() {
  try {
    if (!countries) return;
    const data = await AJAX(COUNTRIES_API);
    countries = data.map((item) => {
      if (item.name.common === "United States") item.name.common = "USA";
      if (item.name.common === "United Kingdom") item.name.common = "UK";
      return item;
    });
  } catch (err) {
    console.error("Error in country list API", err.message);
  }
}

export async function searchBooks(title, page) {
  try {
    // todo - if title contains several words - data is strange in pagination somehow
    // prettier-ignore
    const response = await AJAX(`${BOOK_API}?q=+intitle:${title}&startIndex=${(+page - 1) * +RES_PAGE}&maxResults=${RES_PAGE}`);
    const results = makeUniformed(response);
    const total = response.totalItems;
    return { results, total };
  } catch (err) {
    throw err;
  }
}

async function AJAX(url, uploadData = undefined, method = "GET") {
  try {
    let fetchPro;
    if (uploadData) {
      if (method === "POST" || method === "PUT")
        fetchPro = fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(uploadData),
        });
    } else fetchPro = fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();
    //   if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (err) {
    throw err;
  }
}

function timeout(s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}

function makeUniformed(data) {
  console.log(data.items);
  return data.items?.map((item) => ({
    bookid: item?.id,
    title: item.volumeInfo?.title,
    author: item.volumeInfo?.authors?.[0] || "-",
    desc: item.volumeInfo?.description,
    image_link: item.volumeInfo?.imageLinks?.smallThumbnail || "img/club2.png",
    pages: item.volumeInfo?.pageCount,
    read: false,
    upcoming: false,
    rating: null,
    meeting_date: null,
  }));
}
