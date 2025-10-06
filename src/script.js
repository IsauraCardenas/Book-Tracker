const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");

let ratings = {
  overall: 0,
  romance: 0,
  sadness: 0,
};
let selectedFormat = "";

// Load books
document.addEventListener("DOMContentLoaded", () => {
  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
  storedBooks.forEach((book) => renderBook(book));
});

// Generic rating handler
function setupRating(id, key) {
  const elements = document.querySelectorAll(`#${id} span`);
  elements.forEach((el, idx, arr) => {
    el.addEventListener("click", () => {
      ratings[key] = parseInt(el.getAttribute("data-value"));
      arr.forEach((s) => s.classList.remove("selected"));
      for (let i = 0; i < ratings[key]; i++) {
        arr[i].classList.add("selected");
      }
    });
  });
}

setupRating("starRating", "overall");
setupRating("romanceRating", "romance");
setupRating("sadnessRating", "sadness");

// 📚 Format
const formatOptions = document.querySelectorAll(".format-options input");
formatOptions.forEach((option) => {
  option.addEventListener("change", () => {
    selectedFormat = option.value;
  });
});

// Render Book Card
function renderBook(book) {
  if (!bookList) return;
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  bookCard.innerHTML = `
    <div class="book-card-top">
      <img src="${book.cover}" alt="Book Cover">
      <div class="book-info-top">
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
      </div>
    </div>
    <div class="book-info-bottom">
      <p><strong>Overall:</strong> ${"★".repeat(book.ratings.overall)}</p>
      <p><strong>Romance:</strong> ${"ᥫ᭡".repeat(book.ratings.romance)}</p>
      <p><strong>Sadness:</strong> ${"𓄼".repeat(book.ratings.sadness)}</p>
      <p><strong>Summary:</strong> ${book.summary}</p>
      <p><strong>Favorite Character:</strong> ${book.character}</p>
      <p><strong>Format:</strong> ${book.format}</p>
      <p><strong>Status:</strong> ${book.status}</p>
    </div>
  `;
  bookList.appendChild(bookCard);
}

// ✅ Save to localStorage (fixed)
function saveBook(book) {
  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
  storedBooks.push(book);
  localStorage.setItem("books", JSON.stringify(storedBooks));
}

// ✅ Cover Preview
const coverInput = document.getElementById("cover");
const coverPreview = document.getElementById("coverPreview");

coverInput.addEventListener("change", () => {
  const file = coverInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      coverPreview.src = e.target.result;
      coverPreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    coverPreview.src = "";
    coverPreview.style.display = "none";
  }
});

// ✅ Form Submit
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const summary = document.getElementById("summary").value;
  const character = document.getElementById("character").value;
  const status = document.getElementById("status").value;
  const coverInputFile = document.getElementById("cover").files[0];

  if (!coverInputFile) {
    alert("Please upload a book cover!");
    return;
  }
  if (!selectedFormat) {
    alert("Please choose a format!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const coverURL = e.target.result;
    const book = {
      title,
      author,
      summary,
      character,
      format: selectedFormat,
      ratings: { ...ratings },
      cover: coverURL,
      status,
    };

    renderBook(book);
    saveBook(book);

    // ✅ Redirect (adjust if needed)
    window.location.href = "src/library.html";
  };

  reader.readAsDataURL(coverInputFile);
});

// Navbar toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}
