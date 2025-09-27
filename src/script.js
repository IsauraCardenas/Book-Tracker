// index.js
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submitBtn");
  const coverInput = document.getElementById("cover");
  const coverPreview = document.getElementById("coverPreview");

  let starValue = 0;
  let romanceValue = 0;
  let sadnessValue = 0;

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
  document
    .querySelectorAll("#romanceRating span")
    .forEach((heart, idx, arr) => {
      heart.addEventListener("click", () => {
        romanceValue = parseInt(heart.dataset.value);
        arr.forEach((h) => h.classList.remove("selected"));
        for (let i = 0; i < romanceValue; i++) arr[i].classList.add("selected");
      });
    });

  // Sadness rating
  document.querySelectorAll("#sadnessRating span").forEach((sad, idx, arr) => {
    sad.addEventListener("click", () => {
      sadnessValue = parseInt(sad.dataset.value);
      arr.forEach((s) => s.classList.remove("selected"));
      for (let i = 0; i < sadnessValue; i++) arr[i].classList.add("selected");
    });
  });

  // Save book
  if (submitBtn) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const title = document.getElementById("title").value;
      const author = document.getElementById("author").value;
      const pages = document.getElementById("pages").value;
      const summary = document.getElementById("summary").value;
      const character = document.getElementById("character").value;
      const format = document.querySelector(
        'input[name="format"]:checked'
      )?.value;
      const cover = coverPreview.src;

      if (!title || !author || !cover) {
        alert("Please fill in title, author, and upload a cover!");
        return;
      }

      const book = {
        title,
        author,
        pages,
        summary,
        character,
        format,
        overall: starValue,
        romance: romanceValue,
        sadness: sadnessValue,
        cover,
      };

      let books = JSON.parse(localStorage.getItem("books")) || [];
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));

      // Reset form
      document.querySelectorAll("input, textarea").forEach((el) => {
        if (el.type === "radio" || el.type === "file") el.checked = false;
        else el.value = "";
      });
      coverPreview.src = "";
      starValue = romanceValue = sadnessValue = 0;
      document
        .querySelectorAll(
          "#starRating span, #romanceRating span, #sadnessRating span"
        )
        .forEach((el) => el.classList.remove("selected"));

      alert("Book added to library!");
    });
  }
});
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const status = document.getElementById("status").value;
  const cover = coverPreview.src;

  const book = { title, author, status, cover };

  // Save to localStorage
  let books = JSON.parse(localStorage.getItem("books")) || [];
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));

  form.reset();
  coverPreview.src = "";
  alert("Book added!");
});
document.addEventListener("DOMContentLoaded", () => {
  const filterSelect = document.getElementById("filterStatus");

  if (filterSelect) {
    filterSelect.addEventListener("change", renderLibrary);
  }

  renderLibrary();
});

function renderLibrary() {
  const libraryGrid = document.getElementById("libraryGrid");
  const filterSelect = document.getElementById("filterStatus");
  const selectedFilter = filterSelect ? filterSelect.value : "all";

  libraryGrid.innerHTML = "";

  let books = JSON.parse(localStorage.getItem("books")) || [];

  // Filter by status
  if (selectedFilter !== "all") {
    books = books.filter((book) => book.status === selectedFilter);
  }

  // Render cards
  books.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
      <img src="${book.cover}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p><em>${book.author}</em></p>
      <p class="status">Status: ${formatStatus(book.status)}</p>
    `;

    card.addEventListener("click", () => openModal(book, index));
    libraryGrid.appendChild(card);
  });
}

function formatStatus(status) {
  if (status === "currently-reading") return "📖 Currently Reading";
  if (status === "read") return "✅ Read";
  if (status === "tbr") return "📝 To Be Read";
  return "";
}
