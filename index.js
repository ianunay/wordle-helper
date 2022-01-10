const fs = require("fs");
const data = fs.readFileSync("./wordle-dict.txt", "utf-8").split(",");

function filterWords({ includes, excludes, positions }) {
  return data.filter(
    word =>
      excludes.every(char => !word.includes(char)) &&
      includes.every(char => word.includes(char)) &&
      positions.every(pos => {
        if (pos.correct) {
          return word[pos.index] === pos.char;
        } else {
          return word[pos.index] !== pos.char;
        }
      })
  );
}

// const filterInput = {
//   excludes: ['f', 'o', 'c', 'a', 'l', 'd', 'i', 'g', 't', 's', 'v', 'h', 'm'],
//   includes: ['e', 'r', 'y'],
//   positions: [
//     { index: 1, char: "e", correct: false },
//     { index: 2, char: "r", correct: false },
//     { index: 0, char: "r", correct: false },
//     { index: 2, char: "y", correct: false },
//     { index: 4, char: "e", correct: false }
//   ]
// };

const tmp = {
  "includes": [
      "e"
  ],
  "excludes": [
      "s",
      "l",
      "p"
  ],
  "positions": [
      {
          "index": 2,
          "letter": "e",
          "correct": true
      }
  ]
}
const result = filterWords(tmp);

console.log(JSON.stringify(result));
