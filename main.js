// key and parameters for OMDb API (omdbapi.com)
let key = 'e3758ad2'
let title = 'the other guys'
let endpoint = 'http://www.omdbapi.com/?apikey='

// Selecting page elements, assigning handlers
let app = document.getElementById('app')
let titleInput = document.getElementById('title-input')
app.onclick = getResult

function fetchTitle(title) {
    return fetch(endpoint + key + '&t=' + title)
    .then((response) => {
        return response.json()
    }, (networkError) => {
        resultDiv.innerHTML = networkError.message
    })
    .then((data) => {
        let stringToDisplay = processJson(data)
        console.log(stringToDisplay)
        // prints "The Other Guys, 2010, Action, Comedy... "
        return stringToDisplay
    })
    
}

async function getResult() {
    // create new div
    const resultDiv = document.createElement('div')
    resultDiv.className = 'app-response'
    app.appendChild(resultDiv)

    // fetch the title
    let titleResponse = await fetchTitle(title)

    // write to new div
    resultDiv.innerHTML = titleResponse

}

function processJson(data) {

    let genre = data["Genre"]
    let title = data["Title"]
    let year = data["Year"]
    let ratings = "IMDb: " + data["Ratings"][0]["Value"] + ", " + "Rotten Tomatoes: " + data["Ratings"][1]["Value"] + ", " + "Metacritic: " + data["Ratings"][1]["Value"] + ", "
    
    let stringToDisplay = title + "\n" + year + "\n" + genre + "\n" + ratings
  
    return stringToDisplay
  
  }