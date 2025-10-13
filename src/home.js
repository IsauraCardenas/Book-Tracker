// home.js
document.addEventListener("DOMContentLoaded", () => {
  const currentReadingEl = document.getElementById("currentReading");
  const recentBooksEl = document.getElementById("recentBooks");
  const booksReadEl = document.getElementById("booksRead");
  const goalEl = document.getElementById("goal");
  const goalProgressEl = document.getElementById("goalProgress");
  const quoteEl = document.getElementById("quote");
  const askAIButton = document.getElementById("askAI");
  const userQuestion = document.getElementById("userQuestion");
  const aiResponse = document.getElementById("aiResponse");

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

  // AI Button

  askAIButton.addEventListener("click", async () => {
    const query = userQuestion.value.trim();
    if (query === "") {
      aiResponse.innerHTML =
        "<em>Please enter what kind of book you want 📖</em>";
      return;
    }

    aiResponse.innerHTML =
      "<em>Searching for the perfect books for you... ✨</em>";

    try {
      // Fetch books from Google Books API
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&maxResults=5`
      );
      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        aiResponse.innerHTML =
          "<em>No books found — try a different topic 🌻</em>";
        return;
      }

      //  Display recommendations
      const booksHTML = data.items
        .map((item) => {
          const info = item.volumeInfo;
          const title = info.title || "Untitled";
          const author = info.authors
            ? info.authors.join(", ")
            : "Unknown author";
          const thumbnail = info.imageLinks ? info.imageLinks.thumbnail : "";
          const description = info.description
            ? info.description.substring(0, 120) + "..."
            : "No description available.";

          return `
            <div class="book-reco">
              ${
                thumbnail
                  ? `<img src="${thumbnail}" alt="${title}" class="book-cover" />`
                  : `<div class="no-cover">📘</div>`
              }
              <div class="book-info">
                <strong>${title}</strong><br />
                <em>${author}</em>
                <p>${description}</p>
              </div>
            </div>
          `;
        })
        .join("");

      aiResponse.innerHTML = `
        <h3>📖 Recommended Books</h3>
        <div class="book-list">${booksHTML}</div>
      `;
    } catch (error) {
      console.error(error);
      aiResponse.innerHTML =
        "<em>Something went wrong — please try again later 💭</em>";
    }
  });

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.innerHTML = `<em>${randomQuote}</em>`;
});
