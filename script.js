(function main() {
  getSuggestions();
})();

function getSuggestions() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {msg: "getFilterInput"}, function(response) {
      if (response.result) {
        console.log(response);
        renderResults(response.result);
      }
    });
  });
}

function renderResults(results) {
  const list = results.slice(0, 30).map(word => `<li>${word.toUpperCase()}</li>`).join("")
  document.querySelector(".content").innerHTML = `<ul>${list}</ul>`
}

document.querySelector("#refresh").addEventListener("click", () => {
  getSuggestions();
})
