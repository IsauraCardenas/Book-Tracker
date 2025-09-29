document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookForm");
  const coverInput = document.getElementById("cover");
  const coverPreview = document.getElementById("coverPreview");

  let starValue = 0;
  let romanceValue = 0;
  let sadnessValue = 0;

  // ✅ Preview uploaded cover
  coverInput.addEventListener("change", () => {
    const file = coverInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => (coverPreview.src = e.target.result);
      reader.readAsDataURL(file);
    }
  });

  // ✅ Star rating
  document.querySelectorAll("#starRating span").forEach((star, idx, arr) => {
    star.addEventListener("click", () => {
      starValue = parseInt(star.dataset.value);
      arr.forEach((s) => s.classList.remove("selected"));
      for (let i = 0; i < starValue; i++) arr[i].classList.add("selected");
    });
  });

  // ✅ Romance rating
  document
    .querySelectorAll("#romanceRating span")
    .forEach((heart, idx, arr) => {
      heart.addEventListener("click", () => {
        romanceValue = parseInt(heart.dataset.value);
        arr.forEach((h) => h.classList.remove("selected"));
        for (let i = 0; i < romanceValue; i++) arr[i].classList.add("selected");
      });
    });

  // ✅ Sadness rating
  document.querySelectorAll("#sadnessRating span").forEach((sad, idx, arr) => {
    sad.addEventListener("click", () => {
      sadnessValue = parseInt(sad.dataset.value);
      arr.forEach((s) => s.classList.remove("selected"));
      for (let i = 0; i < sadnessValue; i++) arr[i].classList.add("selected");
    });
  });

  // ✅ Save book on submit
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("title").value.trim();
      const author = document.getElementById("author").value.trim();
      const pages = document.getElementById("pages").value.trim();
      const summary = document.getElementById("summary").value.trim();
      const character = document.getElementById("character").value.trim();
      const format =
        document.querySelector("input[name='format']:checked")?.value || "";
      const status = document.getElementById("status")?.value || "";
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
        status,
      };

      // ✅ Save to localStorage
      let books = JSON.parse(localStorage.getItem("books")) || [];
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));

      // ✅ Reset form + preview + ratings
      form.reset();
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
