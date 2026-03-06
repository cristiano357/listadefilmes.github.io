const background = document.getElementById("modal-background");
const modalContainer = document.getElementById("modal-container")
let current = {};

function backgroundClickHandle(){
    overlay.classList.remove("open")

    movieName.value = "";
    movieYear.value = "";
}

function clousetModal(){
    overlay.classList.remove("open")

    movieName.value = "";
    movieYear.value = "";
}


function addCurrentToList(){
    if(isMovieAlreadyOnList(current.imdbID)){
    notie.alert({ type: "error", text: "Filme já está na sua lista!"})
    return
    }
addToList(current)
upDateUI(current)
upDateLocalStorage()
clousetModal()
} 

function createModal(data){
current = data

modalContainer.innerHTML = ` 

        <h2>${data.Title} - ${data.Year}</h2>
            <section id="modal-body">

                <img
                 id="movie-post" src= ${data.Poster} alt=""
                />

                <div id="movie-info">

                    <h4 id="movie-plot">${data.Plot}</h4>
                    <div  id="modal-cast">
                        <h4>Elenco:</h4>
                        <h5>${data.Actors}</h5>
                    </div>

                    <div id="movie-genre">
                        <h4>Genero</h4>
                        <h5>${data.Genre}</h5>
                    </div>

                </div>

            </section>

            <section id="modal-footer">
                <button id="add-to-list" onclick="addCurrentToList()"> Adicionar filme </button>
            </section> `
}

background.addEventListener("click", backgroundClickHandle)