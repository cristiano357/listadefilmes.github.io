const key = "2b0002a9"

const searchButton = document.getElementById("search-button");
const overlay = document.getElementById("modal-overlay");
const movieName = document.getElementById("movie-name");
const movieYear = document.getElementById("movie-year");
const movieListContainer = document.getElementById("movie-list");

let movieList = JSON.parse(localStorage.getItem("@movieList")) || [];

async function searchButtonClickHandle(){
  try{
    let url = `https://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGeneretor()}${movieYearParameterGenerator()}`
   
    const response = await fetch(url);
    const data = await response.json()
    console.log("data ", data)
    if(data.Error){
        throw new Error("Filme não encontrado!");
        
    }
    createModal(data)
     overlay.classList.add("open");
    }catch (error){
      notie.alert({ type: "error", text: error.message})
    }

}

function movieNameParameterGeneretor(){
    if(movieName.value === ""){
        throw new Error("O nome do Filme não foi digitado!");
    }

    return movieName.value.split(" ").join("+");
}

function movieYearParameterGenerator(){
    if(movieYear.value === ""){
        return ""
    }
    if(movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))){
        throw new Error("Ano do Filme invalido!");
        
    }

    return `&y=${movieYear.value}`
}

function addToList(movieObject){
    movieList.push(movieObject)
}

function isMovieAlreadyOnList(id){
    function doesThisIdBelongToThisMovie(movieObject){
     return movieObject.imdbID === id;
    }
   return Boolean(movieList.find(doesThisIdBelongToThisMovie));
}

function upDateUI(movieObject){
    
    movieListContainer.innerHTML += ` 
        <article id="movie-card-${movieObject.imdbID}">
            <img src="${movieObject.Poster}" alt="poster de ${movieObject.Title}">
            <button id="remove-list"  onclick="{removeMovieFromList('${movieObject.imdbID}')}"><i class="bi bi-trash3"></i> Remover</button>
        </article>`
}

function removeMovieFromList(id){

    notie.confirm({
  text: "Tem certeza que desearja apagar?",
  submitText: "sim", // optional, default = 'Yes'
  cancelText: "não", // optional, default = 'Cancel'
  position:"top" , // optional, default = 'top', enum: ['top', 'bottom']
  submitCallback: function remove(){
  movieList = movieList.filter((movie) => movie.imdbID !== id);
  document.getElementById(`movie-card-${id}`).remove()

  upDateLocalStorage()
  }
    })

}

function upDateLocalStorage(){
    localStorage.setItem("@movieList", JSON.stringify(movieList))
}

for (const movieInfo  of movieList)
    upDateUI(movieInfo)


searchButton.addEventListener("click", searchButtonClickHandle)