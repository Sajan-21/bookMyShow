//go to adminPage
async function mongoDB() {
  document.getElementById("addForm").style.display = "none";

  try {
    let response = await fetch("/movies");
    console.log("response : ", response, "  ", typeof response);

    let parsedResponse = await response.json();
    console.log("parsedResponse : ", parsedResponse);

    let movie = parsedResponse.data;
    console.log("movie : ", movie);

    let dateArr = [];
    let date;

    let row = "";

    for (let i = 0; i < movie.length; i++) {
      dateArr = movie[i].release_date.split(" ");
      date = dateArr[0].split("-");

      row =
        row +
        `
                <div class="d-flex flex-column text-start p-3 border border-danger rounded bg-light">
                    <div class="d-flex gap-3 justify-content-end">
                        <button class="btn border border-primary rounded-pill" onclick="editPage('${movie[i]._id}')">edit</button>
                        <button class="btn border border-danger rounded-pill" onclick="deleteMovie('${movie[i]._id}')">delete</button>
                    </div>
                    <div class="text-start"><img class="width-img" src="${movie[i].image}"></div>
                    <div class="text-start"><img class="width-img" src="${movie[i].bgImg}"></div>
                    <div class="text-start">title : ${movie[i].title}</div>
                    <div class="text-start">category : ${movie[i].category.category}</div>
                    <div class="text-start">language : ${movie[i].language.language}</div>
                    <div class="text-start">duration : ${movie[i].duration}</div>
                    <div class="text-start">release_date : ${movie[i].release_date}</div>
                    <div class="text-start">description : ${movie[i].description}</div>
                    <div class="text-start">cast : ${movie[i].cast}</div>
                    <div class="text-start">crew : ${movie[i].crew}</div>
                    <div class="text-start">rating : ${movie[i].rating}/10</div>
                </div>
            `;
      document.getElementById("mongoContainer").innerHTML = row;
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

//get selectBox to addMovie form
async function getSelectBox() {
  document.getElementById("addForm").style.display = "block";

  try {
    let c_response = await fetch("/categories");
    console.log("response : ", c_response);

    let c_parsed_response = await c_response.json();
    console.log("parsed_response : ", c_parsed_response);

    let c_data = c_parsed_response.data;
    console.log("data : ", c_data);

    let cRows = '<option selected="category">category</option>';

    let category = document.getElementById("category");

    for (let i = 0; i < c_data.length; i++) {
      cRows =
        cRows +
        `
            <option value="${c_data[i].category}">${c_data[i].category}</option>
            `;
    }

    category.innerHTML = cRows;

    //fetch languages

    let l_response = await fetch("/languages");
    console.log("l_response : ", l_response);

    let l_parsed_response = await l_response.json();
    console.log("l_parsed_response : ", l_parsed_response);

    let l_data = l_parsed_response.data;
    console.log("l_data : ", l_data);

    let lRows = '<option selected="language">language</option>';

    let language = document.getElementById("language");

    for (let j = 0; j < l_data.length; j++) {
      lRows =
        lRows +
        `
            <option value="${l_data[j].language}">${l_data[j].language}</option>
            `;
    }

    language.innerHTML = lRows;
  } catch (error) {
    console.log("error : ", error);
  }
}

function exitForm() {
  document.getElementById("addForm").style.display = "none";
}

//get image and convert it into base64 and pass to the addMovie function
async function imageConvertion(event) {
  event.preventDefault();

  try {
    let image = document.getElementById("image");
    let file = image.files[0];

    let dataUrl;
    let bgDataUrl;

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        dataUrl = e.target.result;
        checkIfBothFilesReady();
      };

      reader.readAsDataURL(file);
    } else {
      console.log("no file selected for image");
    }

    let bgImg = document.getElementById("bgImg");
    let bgFile = bgImg.files[0];

    if (bgFile) {
      const bgReader = new FileReader();

      bgReader.onload = function (e) {
        bgDataUrl = e.target.result;
        checkIfBothFilesReady();
      };

      bgReader.readAsDataURL(bgFile);
    } else {
      console.log("no file selected for background image");
    }

    function checkIfBothFilesReady() {
      if (dataUrl && bgDataUrl) {
        addMovie(dataUrl, bgDataUrl);
      }
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

//add data
async function addMovie(image, bgImg) {
  console.log("imgb64 : ", image);
  console.log("bgimgb64 : ", bgImg);

  try {
    let movieData = {
      title: document.getElementById("title").value,
      image,
      bgImg,
      category: document.getElementById("category").value,
      language: document.getElementById("language").value,
      duration: document.getElementById("duration").value,
      release_date: document.getElementById("release_date").value,
      description: document.getElementById("description").value,
      cast: document.getElementById("cast").value,
      crew: document.getElementById("crew").value,
      rating: document.getElementById("rating").value,
    };

    let strMovieData = JSON.stringify(movieData);
    console.log("strMovieData : ", strMovieData);

    let response = await fetch("/movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: strMovieData,
    });
    console.log("response : ", response);

    if (response.status === 200) {
      alert("Movie datas added succesfully");
      window.location = `admin.html`;
    } else {
      alert("Movie addition failed");
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

//go to edit Page from admin page with specefic movie id
function editPage(id) {
  window.location = `edit.html?id=${id}`;
}

//get all movies on index Page in onload
async function getAllMovies() {
  try {
    let c_response = await fetch("/categories");
    console.log("response : ", c_response);

    let c_parsed_response = await c_response.json();
    console.log("parsed_response : ", c_parsed_response);

    let c_data = c_parsed_response.data;
    console.log("data : ", c_data);

    let cRows = '<option selected="category">category</option>';

    let category = document.getElementById("category");

    for (let i = 0; i < c_data.length; i++) {
      cRows =
        cRows +
        `
            <option value="${c_data[i].category}">${c_data[i].category}</option>
            `;
    }

    category.innerHTML = cRows;

    //fetch languages

    let l_response = await fetch("/languages");
    console.log("l_response : ", l_response);

    let l_parsed_response = await l_response.json();
    console.log("l_parsed_response : ", l_parsed_response);

    let l_data = l_parsed_response.data;
    console.log("l_data : ", l_data);

    let lRows = '<option selected="language">language</option>';

    let language = document.getElementById("language");

    for (let j = 0; j < l_data.length; j++) {
      lRows =
        lRows +
        `
            <option value="${l_data[j].language}">${l_data[j].language}</option>
            `;
    }

    language.innerHTML = lRows;
  } catch (error) {
    console.log("error : ", error);
  }

  try {
    let response = await fetch("/movies");
    console.log("response : ", response);

    let parsed_response = await response.json();
    console.log("parsed_response : ", parsed_response);

    let moviesData = parsed_response.data;
    console.log("moviesData : ", moviesData);

    let rows = "";

    for (let i = 0; i < moviesData.length; i++) {
      rows =
        rows +
        `
                <div onclick="singleMoviePage('${moviesData[i]._id}')" class="text-center box-width">
                    <div>
                        <img src="${moviesData[i].image}" class="rounded-top w-100 all-covers" alt="">
                    </div>
                    <div class="">
                        <div class="bg-dark text-light rounded-bottom rating text-start">&#127775; ${moviesData[i].rating}/10</div>
                    </div>
                    <div>
                        <div class="text-start fw-bold fs-5">${moviesData[i].title}</div>
                        <div class="text-start">${moviesData[i].category.category}</div>
                    </div>
                </div>
            `;

      document.getElementById("showAllMovies").innerHTML = rows;
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

//goto single view page
function singleMoviePage(id) {
  window.location = `singleView.html?id=${id}`;
}

//get movie
async function getMovie() {
  let queryString = window.location.search;
  console.log("queryString : ", queryString);

  let url_params = new URLSearchParams(queryString);
  console.log("url_params : ", url_params);

  let id = url_params.get("id");
  console.log("id : ", id);

  try {
    let response = await fetch(`/movie/${id}`);
    let parsed_response = await response.json();
    let movieData = parsed_response.data;

    console.log("image : ", movieData.image);

    let rows = `
                <div>
                    <div class="d-flex gap-3" style="background-image: url('${movieData.bgImg}');">
                        <div class="col-3 text-end">
                            <img src="${movieData.image}" class="w-75" alt="">
                        </div>
                        <div class="col-6">
                            <div id="">${movieData.title}</div>
                            <div id="">${movieData.rating}</div>
                            <div id="">${movieData.language.language}</div>
                            <div class="d-flex gap-3">
                                <div id="">${movieData.duration}</div>
                                <div>${movieData.category.category}</div>
                                <div>${movieData.release_date}</div>
                            </div>
                            <div><button>book tickets</button></div>
                        </div>
                        <div class="col text-end">
                            <button>share</button>
                        </div>
                    </div>
                    <div>
                        <div>about the movie</div>
                        <div id="">${movieData.description}</div>
                    </div>
                    <div>
                        <div>Cast</div>
                        <div id="">${movieData.cast}</div>
                    </div>
                    <div>
                        <div>Crew</div>
                        <div id="">${movieData.crew}</div>
                    </div>
                </div>
            `;

    document.getElementById("showSingleMovie").innerHTML = rows;
  } catch (error) {
    console.log("error : ", error);
  }
}

//deleteMovie
async function deleteMovie(id) {
  try {
    let response = await fetch(`/movie/${id}`, { method: "DELETE" });
    if (response.status === 200) {
      alert("movie deleted successfully");
      window.location = `admin.html`;
    } else {
      alert("movie deletion failed");
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

//get filtered
async function categorized(event) {
  event.preventDefault();

  console.log("buttom clicked");

  let category = document.getElementById("category").value;
  console.log("category : ", category);

  if (category === "category") {
    category = "";
  }

  let language = document.getElementById("language").value;
  console.log("language : ", language);

  if (language === "language") {
    language = "";
  }

  try {
    let response = await fetch(
      `/categorized/?category=${category}&language=${language}`
    );
    console.log("response : ", response);

    let parsed_response = await response.json();
    console.log("parsed_response : ", parsed_response);

    let moviesData = parsed_response.data;
    console.log("moviesData : ", moviesData);

    let rows = "";

    for (let i = 0; i < moviesData.length; i++) {
      rows =
        rows +
        `
                <div onclick="singleMoviePage('${moviesData[i]._id}')" class="text-center box-width">
                    <div>
                        <img src="${moviesData[i].image}" class="rounded-top w-100 all-covers" alt="">
                    </div>
                    <div class="">
                        <div class="bg-dark text-light rounded-bottom rating text-start">&#127775; ${moviesData[i].rating}/10</div>
                    </div>
                    <div>
                        <div class="text-start fw-bold fs-5">${moviesData[i].title}</div>
                        <div class="text-start">${moviesData[i].category.category}</div>
                    </div>
                </div>
            `;

      document.getElementById("showCategorized").innerHTML = rows;
    }
  } catch (error) {
    console.log("error : ", error);
  }
}
