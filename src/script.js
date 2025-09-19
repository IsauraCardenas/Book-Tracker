const bookList = document.getElementById("bookList");
const submitBtn = document.getElementById("submitBtn");
const coverInput = document.getElementById("cover");
const coverPreview = document.getElementById("coverPreview");

let starValue = 0;
let romanceValue = 0;
let sadValue = 0;

// Preview uploaded cover
coverInput.addEventListener("change", () => {
  const file = coverInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => (coverPreview.src = e.target.result);
    reader.readAsDataURL(file);
  }
});

// Star rating
document.querySelectorAll("#starRating span").forEach((star, idx, arr) => {
  star.addEventListener("click", () => {
    starValue = parseInt(star.dataset.value);
    arr.forEach((s) => s.classList.remove("selected"));
    for (let i = 0; i < starValue; i++) arr[i].classList.add("selected");
  });
});

// Romance rating
document.querySelectorAll("#romanceRating span").forEach((heart, idx, arr) => {
  heart.addEventListener("click", () => {
    romanceValue = parseInt(heart.dataset.value);
    arr.forEach((h) => h.classList.remove("selected"));
    for (let i = 0; i < romanceValue; i++) arr[i].classList.add("selected");
  });
});

// Sadness rating
document.querySelectorAll("#sadnessRating span").forEach((sad, idx, arr) => {
  sad.addEventListener("click", () => {
    sadValue = parseInt(sad.dataset.value);
    arr.forEach((d) => d.classList.remove("selected"));
    for (let i = 0; i < sadValue; i++) arr[i].classList.add("selected");
  });
});

// Add book
submitBtn.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const summary = document.getElementById("summary").value;
  const character = document.getElementById("character").value;
  const format = document.querySelector('input[name="format"]:checked')?.value;
  const cover = coverPreview.src;

  if (!title || !author || !cover) {
    alert("Please fill in title, author, and upload a cover!");
    return;
  }

  const book = {
    title,
    author,
    summary,
    character,
    format,
    overall: starValue,
    romance: romanceValue,
    sadness: sadValue,
    cover,
  };

  renderBook(book);

  // Reset
  document.querySelectorAll("input, textarea").forEach((el) => (el.value = ""));
  coverPreview.src = "";
  starValue = 0;
  romanceValue = 0;
  sadValue = 0;
  document
    .querySelectorAll(
      "#starRating span, #romanceRating span, #sadnessRating span"
    )
    .forEach((el) => el.classList.remove("selected"));
  document
    .querySelectorAll('input[name="format"]')
    .forEach((el) => (el.checked = false));
});

// Render book card
function renderBook(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  bookCard.innerHTML = `
    <div class="book-card-top">
      <img src="${book.cover}" alt="Book Cover">
      <div>
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
      </div>
    </div>
    <div class="book-info-bottom">
      <p><strong>Overall:</strong> ${"★".repeat(book.overall)}</p>
      <p><strong>Romance:</strong> ${"ᥫ᭡".repeat(book.romance)}</p>
      <p><strong>Sadness:</strong> ${"𓄼".repeat(book.sadness)}</p>
      <p><strong>Summary:</strong> ${book.summary}</p>
      <p><strong>Favorite Character:</strong> ${book.character}</p>
      <p><strong>Format:</strong> ${book.format || "N/A"}</p>
    </div>
  `;

  bookList.appendChild(bookCard);
}
