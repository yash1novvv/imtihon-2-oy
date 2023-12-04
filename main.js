let elTemplate = document.querySelector(".template").content;
let elList = document.querySelector(".list");
let resultBook = document.querySelector(".result__number");
let plusBtn = document.querySelector(".plus__btn");
let minusBtn = document.querySelector(".minus__btn");
let elForm = document.querySelector(".form");
let searchInput = document.querySelector(".search_input");
let elBookList = document.querySelector(".book__list");
let elNewesBtn = document.querySelector(".btn_order");
let elBookTemplate = document.querySelector(".bookMarkTemplate").content;

let data = {};

(async function () {
  let response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=history&maxResults=15`
  );
  let data = await response.json();
  renderBooks(data, elList);
})();

function renderBooks(book, list) {
  list.innerHTML = null;
  let fragment = document.createDocumentFragment();

  book?.items?.forEach((element) => {
    let template = elTemplate.cloneNode(true);

    template.querySelector(".img").src =
      element?.volumeInfo.imageLinks?.thumbnail;
    template.querySelector(".title__book").textContent =
      element?.volumeInfo.title;
    template.querySelector(".author__book").textContent =
      element?.volumeInfo.authors;
    template.querySelector(".year__book").textContent =
      element?.volumeInfo.publishedDate;
    template.querySelector(".book__btn").dataset.bookMark = element?.id;
    // template.querySelector(".info").dataset.infoId = element?.id;

    fragment.appendChild(template);
  });

  resultBook.textContent = book?.items?.length;
  list.appendChild(fragment);
}

elForm.addEventListener("input", function (evt) {
  evt.preventDefault();

  let search = searchInput.value.trim();
  let pattern = new RegExp(search, "gi");

  (async function () {
    let res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=$%7B${pattern}%7D`
    );

    data = await res.json();
    renderBooks(data, elList);
  })();
});

elNewesBtn.addEventListener("click", function (evt) {
  evt.preventDefault();

  let search = searchInput.value.trim();
  let pattern = new RegExp(search, "gi");

  (async function () {
    let responde = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=$%7B${pattern}%7D&orderBy=newest`
    );
    data = await responde.json();
    renderBooks(data, elList);
  })();
});

// let bookStorage = JSON.parse(localStorage.getItem("bookmark")) || [];

// elList.addEventListener("click", (evt) => {
//   let bookId = evt.target.dataset.bookMark;

//   if (bookId) {
//     let bookmark = data?.items?.find(item => item.id == bookId);

//     let bookIndex = bookStorage.findIndex(item => item.id === bookmark.id);

//     if (bookIndex === -1) {
//       bookStorage.push(bookmark);
//       localStorage.setItem("bookmark", JSON.stringify(bookStorage));
//       renderBookMark(bookStorage, elBookList)
//     }
//   }
// });

// function renderBookMark(bookmark, list) {
//   list.innerHTML = null
//     let elFragment = document.createDocumentFragment();
    
//     bookmark.forEach(item => {
//         let elBookmarkTemplate = elBookTemplate.cloneNode(true)
        
//         elBookmarkTemplate.querySelector('.book_list-title').textContent = item.volumeInfo?.title;
//         elBookmarkTemplate.querySelector('.book_list-text').textContent = item.volumeInfo?.authors;
//         elFragment.appendChild(elBookmarkTemplate)
//     })
    
//     list.appendChild(elFragment)
// }

// elList.addEventListener("click", function (evt) {
//   let moreInfo = evt.target.dataset.infoId;

//   console.log(moreInfo);
// })