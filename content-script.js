chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  if (request.msg === "getFilterInput") {
    const filterInput = buildFilterInput();
    sendResponse({ result: filterWords(filterInput) });
  }
});

function buildFilterInput() {
  const includes = new Set(),
    excludes = new Set();
  const positions = [];

  const rows = Array.from(
    document.querySelector("game-app").shadowRoot.querySelectorAll("game-row")
  );

  rows.forEach(row => {
    const cells = Array.from(row.shadowRoot.querySelectorAll("game-tile"));
    cells.forEach((cell, index) => {
      const letter = cell.getAttribute("letter");
      const evaluation = cell.getAttribute("evaluation");

      switch (evaluation) {
        case "absent":
          if (!includes.has(letter)) {
            excludes.add(letter);
          }
          break;
        case "present":
          if (excludes.has(letter)) {
            excludes.delete(letter);
          }
          includes.add(letter);
          positions.push({
            index,
            letter,
            correct: false,
          });
          break;
        case "correct":
          if (excludes.has(letter)) {
            excludes.delete(letter);
          }
          includes.add(letter);
          positions.push({
            index,
            letter,
            correct: true,
          });
          break;

        default:
          break;
      }
    });
  });

  return {
    includes: Array.from(includes),
    excludes: Array.from(excludes),
    positions,
  };
}

function filterWords({ includes, excludes, positions }) {
  return __wordleHelperExtensionDictionary.filter(
    word =>
      excludes.every(letter => !word.includes(letter)) &&
      includes.every(letter => word.includes(letter)) &&
      positions.every(pos => {
        if (pos.correct) {
          return word[pos.index] === pos.letter;
        } else {
          return word[pos.index] !== pos.letter;
        }
      })
  );
}
