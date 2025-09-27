// home.js
document.addEventListener("DOMContentLoaded", () => {
  const currentReadingEl = document.getElementById("currentReading");
  const recentBooksEl = document.getElementById("recentBooks");
  const booksReadEl = document.getElementById("booksRead");
  const goalEl = document.getElementById("goal");
  const goalProgressEl = document.getElementById("goalProgress");
  const quoteEl = document.getElementById("quote");

  const books = JSON.parse(localStorage.getItem("books")) || [];

  // 1. Currently Reading (pick the first marked "reading")
  const current = books.find((book) => book.status === "reading");
  if (currentReadingEl) {
    if (current) {
      currentReadingEl.innerHTML = `<strong>${current.title}</strong> by ${
        current.author
      } <br> Progress: ${current.progress || 0}%`;
    } else {
      currentReadingEl.textContent = "You’re not currently reading any books.";
    }
  }

  // 2. Recent Additions
  if (recentBooksEl) {
    recentBooksEl.innerHTML = "";
    books.slice(-3).forEach((book) => {
      const img = document.createElement("img");
      img.src = book.cover;
      img.alt = book.title;
      recentBooksEl.appendChild(img);
    });
  }

  // 3. Reading Goal
  const goal = 20;
  const booksRead = books.filter((book) => book.status === "read").length;
  if (booksReadEl && goalEl && goalProgressEl) {
    booksReadEl.textContent = booksRead;
    goalEl.textContent = goal;
    goalProgressEl.value = booksRead;
    goalProgressEl.max = goal;
  }

  // 4. Random Quote
  const quotes = [
    "“A reader lives a thousand lives before he dies.” – George R.R. Martin",
    "“So many books, so little time.” – Frank Zappa",
    "“Reading is essential for those who seek to rise above the ordinary.” – Jim Rohn",
    "“The man who does not read has no advantage over the man who cannot read.” – Mark Twain",
  ];
  if (quoteEl) {
    quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
  }
});
