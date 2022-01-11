(function main() {
  getSuggestions();
})();

function getSuggestions() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs);
    chrome.tabs.sendMessage(
      tabs[0].id,
      { msg: "getFilterInput" },
      function (response) {
        if (response.result) {
          renderResults(response.result);
        }
      }
    );
  });
}

function showEmptyState() {
  document.querySelector("#empty-state").setAttribute("class", "");
}

function renderResults(results) {
  const list = results
    .slice(0, 30)
    .map(word => `<li>${word.toUpperCase()}</li>`)
    .join("");
  document.querySelector("#suggestions").innerHTML = `<ul>${list}</ul>`;
}
