// key and parameters for OMDb API (omdbapi.com)
let key = 'e3758ad2'
let title = 'the other guys'
let year = 2012
let endpoint = 'http://www.omdbapi.com/?apikey='

// Selecting page elements, assigning handlers
let app = document.getElementById('app')
let form = document.querySelector('form')
let titleInput = document.getElementById('title-input')

form.addEventListener('submit', event => {
    event.preventDefault()
    title = titleInput.value
    getResult()
})

function fetchTitle(title) {
    return fetch(endpoint + key + '&t=' + title)
        .then((response) => {
            return response.json()
        }, (networkError) => {
            resultDiv.innerHTML = networkError.message
        })
        .then((data) => {
            console.log(data)
            if (data["Title"]) {
                let stringToDisplay = processJsonForTitle(data)
                return stringToDisplay
            } else {
                return data["Error"]
            }

        })
}

async function getResult() {
    // check if already has result
    if (app.childNodes.length > 5) {
        app.removeChild(app.childNodes[5])
    }

    // create new div
    const resultDiv = document.createElement('div')
    resultDiv.className = 'app-response'
    app.appendChild(resultDiv)

    // fetch the title
    let titleResponse = await fetchTitle(title)

    // write to new div
    resultDiv.innerHTML = titleResponse
}

function processJsonForTitle(data) {

    let genre = data["Genre"]
    let title = data["Title"]
    let year = data["Year"]
    let ratings = "";
     
    if (data["Ratings"][0]) {
        ratings += "IMDb: " + data["Ratings"][0]["Value"]
    } else {
        ratings += "IMDb: none"
    }

    if (data["Ratings"][1]) {
        ratings += ", Rotten Tomatoes: " + data["Ratings"][1]["Value"]
    } else {
        ratings += ", Rotten Tomatoes: none"
    }

    if (data["Ratings"][2]) {
        ratings += ", Metacritic: " + data["Ratings"][2]["Value"]
    } else {
        ratings += ", Metacritic: none"
    }
      
    let stringToDisplay = `<p>${title}</p><p>${year}</p><p>${genre}</p><p>${ratings}</p>`

    return stringToDisplay
}






// fetchYear is not useful because OMDb API actually doesn't let you fetch all the movies in a year... have to search by title
function fetchYear(year) {
    return fetch(endpoint + key + '&y=' + year)
        .then((response) => {
            reader = response.body.getReader()
            const stream = new ReadableStream({
                start(controller) {
                    // The following function handles each data chunk
                    function push() {
                      // "done" is a Boolean and value a "Uint8Array"
                      reader.read().then(({ done, value }) => {
                        // Is there no more data to read?
                        if (done) {
                          // Tell the browser that we have finished sending data
                          controller.close();
                          return;
                        }
              
                        // Get the data and send it to the browser via the controller
                        controller.enqueue(value);
                        push();
                      });
                    };
                    
                    push();
                }
            })
            let respStream = new Response(stream, { headers: { "Content-Type": "text/html" } }); 
            return respStream
        })
        .then((respStream) => {
        })

}


function processJsonForYear(data) {
    // console.log(data)
}