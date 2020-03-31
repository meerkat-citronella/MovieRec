// key and parameters for OMDb API (omdbapi.com)
let key = 'e3758ad2'
let title = 'the other guys'





let app = document.getElementById('app')
app.onclick = getResult

function getResult() {
  const resultFrame = document.createElement('div')
  resultFrame.className = 'app-response'
  app.appendChild(resultFrame)

  fetch('http://www.omdbapi.com/?apikey=[' + key + ']&t=' + title)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    app.innerHTML = data
  });


}
