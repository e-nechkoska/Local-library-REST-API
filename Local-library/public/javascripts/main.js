const allBooks = document.querySelector(".books");
const bookList = document.querySelector(".bookList");

const displayAllBooks = () => {
  fetch("http://localhost:1234/catalog/books")
    .then(response => { 
      return response.json();
    })
    .then(result => {
      bookList.innerHTML = '';

      const books = result.data;
      for (let i = 0; i < books.length; i++) {
        // let clickedBook = false;
        const bookElement = document.createElement("li");
        bookElement.textContent = books[i].title;
        bookList.appendChild(bookElement);

        const showBookDetails = (event) => {
          event.preventDefault();
          event.stopPropagation();
          
          // if (clickedBook) {
          //   return;
          // }
          // clickedBook = true;
          bookElement.removeEventListener("click", showBookDetails);

          const bookWrapperElement = document.createElement("div");
          const deleteBookButton = document.createElement("button");
          const bookAuthorElement = document.createElement("p");
          const bookSummaryElement = document.createElement("p");

          deleteBookButton.textContent = "Delete";
          deleteBookButton.className = "btn-primary";

          const bookAuthorName = createAuthorName(books[i].author.firstName, books[i].author.familyName);
          bookAuthorElement.textContent = bookAuthorName;
          bookSummaryElement.textContent = books[i].summary;

          const updateBookButton = addUpdateBookButton(bookElement, books[i], bookAuthorName);
          deleteBookButton.addEventListener("click", (event) => {
            event.preventDefault();
            console.log(books[i]._id);
            deleteBook(books[i]);
          });

          bookWrapperElement.appendChild(bookAuthorElement);
          bookWrapperElement.appendChild(bookSummaryElement);
          bookWrapperElement.appendChild(updateBookButton);
          bookWrapperElement.appendChild(deleteBookButton);
          bookElement.appendChild(bookWrapperElement);
        };

        bookElement.addEventListener("click", showBookDetails);
      }
    })
    .catch((error) => console.log(error,message));
};

const addUpdateBookButton = (bookElement, book, bookAuthorName) => {
  const updateBookButton = document.createElement("button");
  updateBookButton.textContent = "Update";
  updateBookButton.className = "btn-primary";
  updateBookButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    addBookForm(bookElement, book, bookAuthorName);
  });
  return updateBookButton;
};

const addBookForm = (bookElement, book, selectedAuthorName) => {
  const updateBookForm = document.createElement("form");
  updateBookForm.classList = "form-group";
  addBookTitle(updateBookForm, book.title);
  addAuthorSelect(updateBookForm, selectedAuthorName).then(() => {
    addSaveBookUpdateButton(updateBookForm);
  });

  updateBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const updatedTitle = updateBookForm.querySelector("input").value;
    const updatedAuthorId = updateBookForm.querySelector("select").value;
    
    const updatedBook = {
      _id: book._id,
      genre: book.genre,
      summary: book.summary,
      isbn: book.isbn,
      title: updatedTitle,
      authorId: updatedAuthorId
    };

    updateBook(updatedBook);
  });

  bookElement.appendChild(updateBookForm);
}

const addBookTitle = (updateBookForm, title) => {
  const updatedBookTitle = createUpdateTitle(title);
  updateBookForm.appendChild(updatedBookTitle)
}

const createUpdateTitle = (title) => {
  const updateTitle = document.createElement("input");
  updateTitle.classList = "form-control";
  updateTitle.addEventListener("click", event => event.stopPropagation());
  updateTitle.value = title;
  return updateTitle;
};

const addAuthorSelect = (updateBookForm, selectedAuthorName) => {
  return fetchAuthors().then((authors) => {
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
  authorSelect.classList = "form-control";

  for (let j = 0; j < authors.length; j++) {
    const author = document.createElement("option");
    author.value = authors[j]._id; 
    author.textContent = createAuthorName(authors[j].firstName, authors[j].familyName);

    if (selectedAuthorName === author.value) {
      author.selected = true;
    }
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

const addSaveBookUpdateButton = (updateBookForm) => {
  const saveBookButton = document.createElement("button");
  saveBookButton.textContent = "Save";
  saveBookButton.className = "btn-primary";
  updateBookForm.appendChild(saveBookButton);
};

const updateBook = (updatedBook) => {
  const url = `http://localhost:1234/catalog/books/${updatedBook._id}`;

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedBook)
  }).then(response => response.json())
  .then(console.log);
};

const deleteBook = (selectedBook) => {
  const url = `http://localhost:1234/catalog/books/${selectedBook._id}`;

  fetch(url, {
    method: "DELETE"
  }).then(() => displayAllBooks()); 
}; 

allBooks.addEventListener("click", () => {
  displayAllBooks();
});
