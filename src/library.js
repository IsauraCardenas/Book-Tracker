// library.js
document.addEventListener("DOMContentLoaded", () => {
  const libraryGrid = document.getElementById("libraryGrid");
  const modal = document.getElementById("bookModal");
  const modalDetails = document.getElementById("modalDetails");
  const closeModal = document.getElementById("closeModal");
  const deleteBookBtn = document.getElementById("deleteBookBtn");

  let selectedBookIndex = null;

  function loadLibrary() {
    if (!libraryGrid) return;
    const books = JSON.parse(localStorage.getItem("books")) || [];
    libraryGrid.innerHTML = "";

    books.forEach((book, index) => {
      const img = document.createElement("img");
      img.src = book.cover;
      img.alt = book.title;
      img.addEventListener("click", () => openModal(book, index));
      libraryGrid.appendChild(img);
    });
  }

  function openModal(book, index) {
    selectedBookIndex = index;
    modalDetails.innerHTML = `
      <h2>${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Overall:</strong> ${"★".repeat(book.overall)}</p>
      <p><strong>Romance:</strong> ${"ᥫ᭡".repeat(book.romance)}</p>
      <p><strong>Sadness:</strong> ${"𓄼".repeat(book.sadness)}</p>
      <p><strong>Summary:</strong> ${book.summary}</p>
      <p><strong>Favorite Character:</strong> ${book.character}</p>
      <p><strong>Format:</strong> ${book.format}</p>
      <img src="${
        book.cover
      }" style="width:100%; margin-top:10px; border-radius:10px;">
    `;
    modal.style.display = "flex";
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      selectedBookIndex = null;
    });
  }

  if (deleteBookBtn) {
    deleteBookBtn.addEventListener("click", () => {
      if (selectedBookIndex !== null) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.splice(selectedBookIndex, 1);
        localStorage.setItem("books", JSON.stringify(books));
        modal.style.display = "none";
        loadLibrary();
      }
    });
  }

  window.addEventListener("click", (e) => {
    if (modal && e.target === modal) {
      modal.style.display = "none";
    }
  });

  loadLibrary();
});
function renderLibrary() {
  const libraryGrid = document.getElementById("libraryGrid");
  libraryGrid.innerHTML = "";

  let books = JSON.parse(localStorage.getItem("books")) || [];

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
