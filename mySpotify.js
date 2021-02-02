async function loadSongs(artist) {
    // replace "eminem" after "q=" --> with "+ artist"
    let response = await fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=" + artist, {
        "method": "GET",
        "headers": { // credentials to access the server
            "x-rapidapi-key": "e15adf89a9msh15e27b15a3da140p1133f8jsn3cde8bb0d03c",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
        }
    })

    let songsResponse = await response.json()
    console.log(songsResponse)
    // this returns an array with the songs inside
    return songsResponse.data;
}

// create another async function --> function will create a song-card for every song
// So, we copy the code for the song-card and substitute "eminem" with "songs"
// then we go back into .html

// i want to create a container inside of my div
async function renderSongs(artist) {

    let songs = await loadSongs(artist)

    let songsDiv = document.getElementById("songs")

    // i want to create a container inside of my div:
    // <div>Title</div>
    // <div>
    //     Songs inside
    // </div>
    // this is how we do it:

    let artistSection = document.createElement("div") // create a new parent div
    let title = document.createElement("h2") // inside of the div: create a title for the section and the cards of the songs
    title.innerText = "Songs from " + artist // title will be "Songs from.." + name of artist
    artistSection.appendChild(title) // add this to the artist section 

    let songsContainer = document.createElement("div") // creating container for the songs
    songsContainer.classList.add("song-list") // give it a class --> cause we want cards to be displayed next to another

    // we won't be adding the songs to the "div" anymore, but to the songs "container" + for each song using Stefano's model to create a new card
    songs.forEach(song => { // add an event listener [step1: add card as reference; step2: event listener]
        let songCard = document.createElement("div")
        songCard.classList.add("song-card")
        songCard.innerHTML += ` 
                    <img 
                    src="${song.album.cover_medium}" 
                    class="song-card-image" 
                    alt="Artist picture"
                    />
                    <div class="song-class-info">
                        <div class="song-card-artist">${song.artist.name}</div>
                        <div class="song-card-album">${song.album.title}</div>
                        <div class="song-card-title">${song.title}</div>
                    </div>
                    <div class="song-card-play"></div>`

        songsContainer.appendChild(songCard)

        songCard.addEventListener("click", (e) => { // two properties: 1) what he's waiting for (click); 2) action he will perform 
            console.log("clicked")
            // reference the player part
            let player = document.getElementById("player")
            // backtick --> replace string with pieces of .js
            // add the picutre of the song
            // add the title of the song
            player.innerHTML = `
            <div class="player-content">
                <img src=${song.album.cover_medium} alt="picture song"/>
                <p>${song.title}</p>
            </div>
            `        

            // play the song 
            let audioPlayer = document.getElementById("audio-player")
            // set the source for it
            audioPlayer.src = song.preview
            // audioPlayer.play() -- this works!
        }) 
    })

    artistSection.appendChild(songsContainer) // adding the song container to the artist section 
    
    songsDiv.appendChild(artistSection) // adding this artist section to the songs div 
}

let menuEntries = ["Top hits", "This winter", "Last summer", "Tropical vibes", "Top 20 UK", "Best of metal", "Hip Hop daily", "Night out"] 

// invoke from html: load menu
// read the array and map into my html
function loadMenu() {
    let menu = document.querySelector("#menu")  // same as document.getElementById("menu")
    // add to the innerHTML, for each element, a new list item
    // "+=" means add to the current content of the menu (as an element) 
    // transform strings into html elements (a list item, that will have the arrays content)
    // if I want to assign this to the innerHTML, I must ".join" it
    menu.innerHTML += menuEntries.map(entry => `<li>${entry}</li>`).join("")
}

async function searchSong() {
    // should read the value from search input
    let searchText = document.getElementById("search-text")
    let searchValue = searchText.value
    let songsDiv = document.getElementById("songs") // this clears the page from the other results (you see only the songs, searched for)
    songsDiv.innerHTML = "" // alternatively: songsDiv.textContent = ""
    // load the songs
    await renderSongs(searchValue)
}