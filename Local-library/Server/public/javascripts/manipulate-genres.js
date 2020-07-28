const allGenres = document.querySelector(".genres");
const genreList = document.querySelector(".content-list");
const genreForm = document.querySelector(".genre-form");

allGenres.addEventListener("click", () => displayAllGenres());

const displayAllGenres = () => {
  fetch("http://localhost:1234/catalog/genres")
  .then(response => response.json())
  .then(result => {
    genreList.innerHTML = '';
    genreForm.innerHTML = '';
    const genres = result.data;

    for(let i = 0; i < genres.length; i++) {
      let selectedGenre = false;
      const genreElement = document.createElement("li");
      const genreDetailElement = document.createElement("div");

      genreElement.textContent = genres[i].name;
      genreElement.appendChild(genreDetailElement);
      genreList.appendChild(genreElement);

      genreElement.addEventListener("click", (event) => {
        if(selectedGenre) {
          return;
        }
        selectedGenre = true;
        event.preventDefault();

        const updateButton = addUpdateButton();
        const deleteButton = addDeleteButton();

        deleteButton.addEventListener("click", (event) => {
          event.preventDefault();
          deleteGenre(genres[i]);
        });

        updateButton.addEventListener("click", (event) => {
          event.preventDefault();
          displayUpdateForm(genres[i]);
        });

        genreDetailElement.appendChild(updateButton);
        genreDetailElement.appendChild(deleteButton);
      });
    }
  }).catch(error => console.log(error.message));
};

const addUpdateButton = () => {
  const updateButton = document.createElement("button");

  updateButton.className = "btn-primary";
  updateButton.textContent = "Update";

  return updateButton;
};

const addDeleteButton = () => {  
  const deleteButton = document.createElement("button");

  deleteButton.classList = "btn-primary";
  deleteButton.textContent = "Delete";

  return deleteButton;
};

const deleteGenre = (genre) => {
  fetch(`http://localhost:1234/catalog/genres/${genre._id}` , {
  method: "DELETE"
  }).then(() => displayAllGenres())
  .catch(error => console.log(error.message));
};

const displayUpdateForm = (genre) => {
  genreForm.innerHTML = '';
  const updateGenreName = document.createElement("input");
  const updateGenreLabel = document.createElement("label");
  const saveButton = document.createElement("button");

  updateGenreLabel.textContent = "Update Genre";
  updateGenreName.value = genre.name;

  saveButton.textContent = "Save";
  saveButton.className = "btn-primary";
  // saveButton.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   saveUpdatedGenre();
  // });

  genreForm.appendChild(updateGenreLabel);
  genreForm.appendChild(updateGenreName);
  genreForm.appendChild(saveButton);

  genreForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const updatedGenreName = genreForm.querySelector("input").value;

    const updatedGenre = {
      name: updatedGenreName,
      _id: genre._id
    }

    updateGenre(updatedGenre);
  });
};

const updateGenre = (updatedGenre) => {
  fetch(`http://localhost:1234/catalog/genres/${updatedGenre._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedGenre)
  }).then(response => {
    response.json();
    displayAllGenres();
  })
  .catch(console.log);
};