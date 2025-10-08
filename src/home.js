// home.js
document.addEventListener("DOMContentLoaded", () => {
  const currentReadingEl = document.getElementById("currentReading");
  const recentBooksEl = document.getElementById("recentBooks");
  const booksReadEl = document.getElementById("booksRead");
  const goalEl = document.getElementById("goal");
  const goalProgressEl = document.getElementById("goalProgress");
  const quoteEl = document.getElementById("quote");

  // Load saved books
  const books = JSON.parse(localStorage.getItem("books")) || [];

  // Currently Reading
  const currentlyReading = books.filter(
    (book) => book.status === "currently-reading"
  );

  if (currentlyReading.length > 0) {
    currentReadingEl.innerHTML = currentlyReading
      .map(
        (book) => `
        <div class="book-item" data-title="${book.title}">
          <img src="${book.cover}" alt="${book.title}" class="small-cover">
          <div>
            <strong>${book.title}</strong><br>
            <em>${book.author}</em>
          </div>
        </div>
      `
      )
      .join("");

    // Make cards clickable
    currentReadingEl.querySelectorAll(".book-item").forEach((item) => {
      item.addEventListener("click", () => {
        const title = item.dataset.title;
        if (window.openBookFromHome) {
          window.openBookFromHome(title);
        }
      });
    });
  } else {
    currentReadingEl.textContent = "You’re not currently reading any books.";
  }

  // Recent Additions
  const recent = [...books].slice(-3).reverse(); // last 3 added books

  if (recent.length > 0) {
    recentBooksEl.innerHTML = recent
      .map(
        (book) => `
        <div class="book-item" data-title="${book.title}">
          <img src="${book.cover}" alt="${book.title}" class="small-cover">
          <div>
            <strong>${book.title}</strong><br>
            <em>${book.author}</em>
          </div>
        </div>
      `
      )
      .join("");

    //  Make recent cards clickable
    recentBooksEl.querySelectorAll(".book-item").forEach((item) => {
      item.addEventListener("click", () => {
        const title = item.dataset.title;
        if (window.openBookFromHome) {
          window.openBookFromHome(title);
        }
      });
    });
  } else {
    recentBooksEl.textContent = "No books added yet.";
  }

  //  Reading Goal Progress
  const booksRead = books.filter((book) => book.status === "read").length;
  const goal = parseInt(goalEl.textContent) || 20;

  booksReadEl.textContent = booksRead;
  goalProgressEl.value = booksRead;

  // Quote of the day
  const quotes = [
    "A reader lives a thousand lives before he dies. - George R.R. Martin",
    "So many books, so little time. - Frank Zappa",
    "Reading gives us someplace to go when we have to stay where we are. - Mason Cooley",
    "Books are a uniquely portable magic. - Stephen King",
    "You can never get a cup of tea large enough or a book long enough to suit me. - C.S. Lewis",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.innerHTML = `<em>${randomQuote}</em>`;
});
