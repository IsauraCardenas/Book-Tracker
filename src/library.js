// library.js
document.addEventListener("DOMContentLoaded", () => {
  const libraryGrid = document.getElementById("libraryGrid");
  const modal = document.getElementById("bookModal");
  const modalDetails = document.getElementById("modalDetails");
  const closeModal = document.getElementById("closeModal");
  const deleteBookBtn = document.getElementById("deleteBookBtn");
  const filterSelect = document.getElementById("filterStatus");

  let selectedBookIndex = null;

  // ✅ Open modal with book details
  function openModal(book, index) {
    selectedBookIndex = index;
    modalDetails.innerHTML = `
      <h2>${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Overall:</strong> ${"★".repeat(book.overall || 0)}</p>
      <p><strong>Romance:</strong> ${"ᥫ᭡".repeat(book.romance || 0)}</p>
      <p><strong>Sadness:</strong> ${"𓄼".repeat(book.sadness || 0)}</p>
      <p><strong>Summary:</strong> ${book.summary || "No summary"}</p>
      <p><strong>Favorite Character:</strong> ${book.character || "—"}</p>
      <p><strong>Format:</strong> ${book.format || "—"}</p>
      <p><strong>Status:</strong> ${formatStatus(book.status)}</p>
      <img src="${
        book.cover
      }" style="width:100%; margin-top:10px; border-radius:10px;">
    `;
    modal.style.display = "flex";
  }

  // ✅ Render library with optional filter
  function renderLibrary() {
    libraryGrid.innerHTML = "";

    let books = JSON.parse(localStorage.getItem("books")) || [];
    const selectedFilter = filterSelect ? filterSelect.value : "all";

    if (selectedFilter !== "all") {
      books = books.filter((book) => book.status === selectedFilter);
    }

    books.forEach((book, index) => {
      const card = document.createElement("div");
      card.classList.add("book-card");

      card.innerHTML = `
        <img src="${book.cover}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p><em>${book.author}</em></p>
        <p class="status">${formatStatus(book.status)}</p>
      `;

      // ✅ Clicking opens modal
      card.addEventListener("click", () => openModal(book, index));
      libraryGrid.appendChild(card);
    });
  }

  // ✅ Format status nicely
  function formatStatus(status) {
    if (status === "currently-reading") return "📖 Currently Reading";
    if (status === "read") return "✅ Read";
    if (status === "tbr") return "📝 To Be Read";
    return "❓ Unknown";
  }

  // ✅ Close modal
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      selectedBookIndex = null;
    });
  }

  // ✅ Delete book
  if (deleteBookBtn) {
    deleteBookBtn.addEventListener("click", () => {
      if (selectedBookIndex !== null) {
        let books = JSON.parse(localStorage.getItem("books")) || [];
        books.splice(selectedBookIndex, 1);
        localStorage.setItem("books", JSON.stringify(books));
        modal.style.display = "none";
        renderLibrary();
      }
    });
  }

  // ✅ Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (modal && e.target === modal) {
      modal.style.display = "none";
    }
  });

  // ✅ Filter listener
  if (filterSelect) {
    filterSelect.addEventListener("change", renderLibrary);
  }

  renderLibrary();
});
