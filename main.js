// key and parameters for OMDb API (omdbapi.com)
let key = 'e3758ad2'
let title = 'the other guys'

// Selecting page elements, assigning handlers
let app = document.getElementById('app')
app.onclick = getResult
let titleInput = document.getElementById('title-input')
console.log(titleInput)


// fetch request
function getResult() {
  const resultFrame = document.createElement('div')
  resultFrame.className = 'app-response'
  app.appendChild(resultFrame)
  

  fetch('http://www.omdbapi.com/?apikey=' + key + '&t=' + title)
  .then((response) => {
    // console.log('1st: ', response) 
    // console.log('2nd: ', response.json())
    // return renderJsonResponse(response);
    return response.json()
  }, (networkError) => {
    resultFrame.innerHTML = networkError.message
  })
  .then((data) => {

    
    console.log(data)

    let genre = data["Genre"]
    let title = data["Title"]
    let year = data["Year"]
    let ratings = "IMDb: " + data["Ratings"][0]["Value"] + ", " + "Rotten Tomatoes: " + data["Ratings"][1]["Value"] + ", " + "Metacritic: " + data["Ratings"][1]["Value"] + ", "
    
    let stringToDisplay = title + "\n" + year + "\n" + genre + "\n" + ratings

    console.log(stringToDisplay)

    resultFrame.innerHTML = stringToDisplay


  })
}












// FROM CODECADEMY LESSON ON REQUESTS
// Renders the JSON that was returned when the Promise from fetch resolves.
const renderJsonResponse = (response) => {
  // Creates an empty object to store the JSON in key-value pairs
  let rawJson = {}
  for(let key in response){
    rawJson[key] = response[key]
  }
  // Converts JSON into a string and adding line breaks to make it easier to read
  rawJson = JSON.stringify(rawJson).replace(/,/g, ", \n")
  // Manipulates responseField to show the returned JSON.
  // responseField.innerHTML = `<pre>${rawJson}</pre>`

  // return rawJson
  console.log('3rd', rawJson)
  return rawJson
}
