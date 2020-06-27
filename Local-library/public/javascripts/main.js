const books = document.querySelector(".books");
const bookList = document.querySelector(".bookList");

let clicked = false;
let clickedBook = false;

const displayAllBooks = () => {
  fetch("http://localhost:1234/catalog/books")
    .then((books) => {
      return books.json();
    })
    .then((result) => {
      const books = result.data;
      for (let i = 0; i < books.length; i++) {
        const bookElement = document.createElement("li");
        bookElement.textContent = books[i].title;
        bookList.appendChild(bookElement);
        bookElement.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          // if(clickedBook === false) {
          //   clickedBook = true;
          const bookWrapperElement = document.createElement("div");
          const deleteBookButton = document.createElement("button");
          const bookAuthorElement = document.createElement("p");
          const bookSummaryElement = document.createElement("p");

          deleteBookButton.textContent = "Delete";
          
          const bookAuthorName = createAuthorName(books[i].author.firstName, books[i].author.familyName);
          bookAuthorElement.textContent = bookAuthorName;
          bookSummaryElement.textContent = books[i].summary;

          const updateBookButton = addUpdateBookButton(bookElement, books[i].title, bookAuthorName);
          deleteBookButton.addEventListener("click", (event) =>
            event.stopPropagation()
          );
          bookWrapperElement.appendChild(bookAuthorElement);
          bookWrapperElement.appendChild(bookSummaryElement);
          bookWrapperElement.appendChild(updateBookButton);
          bookWrapperElement.appendChild(deleteBookButton);
          bookElement.appendChild(bookWrapperElement);
        });
      }
      clicked = true;
    })
    .catch((error) => console.log(error,message));
};

const addUpdateBookButton = (bookElement, title, bookAuthorName) => {
  const updateBookButton = document.createElement("button");
  updateBookButton.textContent = "Update";
  updateBookButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    addBookForm(bookElement, title, bookAuthorName);
    addSaveBookUpdateButton(bookElement);
  });
  return updateBookButton;
};

const addBookForm = (bookElement, title, selectedAuthorName) => {
  const updateBookForm = document.createElement("form");
  addBookTitle(updateBookForm, title);
  addAuthorSelect(updateBookForm, selectedAuthorName);
  bookElement.appendChild(updateBookForm);
}

const addBookTitle = (updateBookForm, title) => {
  const updatedBookTitle = createUpdateTitle(title);
  updateBookForm.appendChild(updatedBookTitle)
}

const createUpdateTitle = (title) => {
  const updateTitle = document.createElement("input");
  updateTitle.addEventListener("click", (event) => event.stopPropagation());
  updateTitle.value = title;
  return updateTitle;
};

const addAuthorSelect = (updateBookForm, selectedAuthorName) => {
  fetchAuthors().then((authors) => {
    const authorsSelect = createAuthorsSelect(authors, selectedAuthorName);
    updateBookForm.appendChild(authorsSelect);
  });
};

const createAuthorName = (firstName, familyName) => {
  const name = firstName + " " + familyName;
  return name;
};

const createAuthorsSelect = (authors, selectedAuthorName) => {
  const authorSelect = document.createElement("select");
  authorSelect.addEventListener("click", (event) => event.stopPropagation());

  for (let j = 0; j < authors.length; j++) {
    const author = document.createElement("option");
    author.value = createAuthorName(authors[j].firstName, authors[j].familyName); 
    author.textContent = author.value;

    if (selectedAuthorName === author.value) {
      author.selected = true;
    }
    author.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    authorSelect.appendChild(author);
  }

  return authorSelect;
};

const fetchAuthors = () => {
  return fetch("http://localhost:1234/catalog/authors")
    .then((results) => results.json())
    .then((results) => {
      const authors = results.data;
      return Promise.resolve(authors);
    })
    .catch((error) => console.log(error));
};

const addSaveBookUpdateButton = (bookElement) => {
  const saveBookButton = document.createElement("button");
  saveBookButton.textContent = "Save";
  bookElement.appendChild(saveBookButton);
};

// const updateBook = (title, authorName) => {
//   title.textContent = 
// };

books.addEventListener("click", () => {
  if (clicked === false) {
    displayAllBooks();
  }
});
