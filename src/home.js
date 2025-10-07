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
        <div class="book-item">
          <img src="${book.cover}" alt="${book.title}" class="small-cover">
          <div>
            <strong>${book.title}</strong><br>
            <em>${book.author}</em>
          </div>
        </div>
      `
      )
      .join("");
  } else {
    currentReadingEl.textContent = "You’re not currently reading any books.";
  }

  //Recent Additions
  const recent = [...books].slice(-3).reverse(); // last 3 added books

  if (recent.length > 0) {
    recentBooksEl.innerHTML = recent
      .map(
        (book) => `
        <div class="book-item">
          <img src="${book.cover}" alt="${book.title}" class="small-cover">
          <div>
            <strong>${book.title}</strong><br>
            <em>${book.author}</em>
          </div>
        </div>
      `
      )
      .join("");
  } else {
    recentBooksEl.textContent = "No books added yet.";
  }

  // 3. Reading Goal Progress
  const booksRead = books.filter((book) => book.status === "read").length;
  const goal = parseInt(goalEl.textContent) || 20;

  booksReadEl.textContent = booksRead;
  goalProgress.value - booksRead;

  // Quote of the day

  const quotes = [
    "Areader lives a thousand lives before he dies. - George R.R. Martin",
    "So many books, so little time. - Frank Zappa",
    "Reading gives us someplace to go when we have to stay where we are. - Mason Coley",
    "Books are a uniquely portable magic. - Stephen King",
    "You can never get a cup of tea larger enough or a book long enough to suit me. - C.S Lewis",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quotes.innerHTML = "<em>${randomQuotes}</em>";
});
