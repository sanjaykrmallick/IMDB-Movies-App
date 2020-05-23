let search = document.querySelector("#search");

search.addEventListener("keyup", (e)=>{
    let searchText = e.target.value;
    console.log(searchText);
    SearchMovies(searchText)
    let template = document.querySelector("#template");
    template.style.display="flex";
    let signIn = document.querySelector("#signIn");
    signIn.style.display="none";
    //when key press hide from text and h1
    let formText = document.getElementById("divBlock");
    formText.style.display = "none";
    search.classList.add("afterKeyPress");
    document.querySelector("#formBlock").classList.add("afterKey_formBlock");
})

//speech recognition api
let speechSearch = document.getElementById("speechIcon")
speechSearch.addEventListener("click", () => {
    let formText = document.getElementById("divBlock");
    formText.style.display = "none";
    search.classList.add("afterKeyPress")
    document.querySelector("#formBlock").classList.add("afterKey_formBlock");
    let signIn = document.querySelector("#signIn");
    signIn.style.display="none";
    let template = document.querySelector("#template");
    template.style.display="flex";

    window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new SpeechRecognition();
    let p = document.createElement("p");
    recognition.interimResults = true;

    recognition.addEventListener("result", (e) => {
        let transcript = [...e.results]
            .map((result) => result[0])
            .map((result) => result.transcript)
            .join("");

        search.value = transcript;
        if (e.results[0].isFinal) {
            p = document.createElement("p");
            p.innerHTML = transcript;
            let searchText = transcript;
            SearchMovies(searchText);
        }
    });
    recognition.start();
});


function SearchMovies(searchText){
    var searchText = searchText.replace(/\s+/g, '&');
    const imdbApi= `http://omdbapi.com/?s=${searchText}&apikey=ac32330c`;
    console.log(imdbApi)
    window.fetch(imdbApi)
        .then((data)=>{
            data.json()
                .then((movieData)=>{
                    console.log(movieData);
                    let movies = movieData.Search;
                    let output = [];
                    for (let movie of movies) {
                        let defaultImg = (movie.Poster === "N/A" ? "/images/movie.jpg" : movie.Poster);
                        output += `<div>
                                        <img src ="${defaultImg}" />
                                        <h1>${movie.Title}</h1>
                                        <p>${movie.Year}</p>
                                        <a  href ="http://www.imdb.com/title/${movie.imdbID}/"target ="_blank">Movie Details</a>
                                    </div>
                                    `;
                    }
                    document.getElementById("template").innerHTML = output;
                })
                .catch((err)=>console.log(err))
        })
        .catch((err)=>console.log(err))
        
}
