// Script to sort dictionary by calculating scores

const fs = require("fs");
const data = fs.readFileSync("./wordle-dict.txt", "utf-8").split(",");

const scores = Array(5)
  .fill(null)
  .map(() => new Map());
data.forEach(word => {
  const letters = word.split("");
  letters.forEach((letter, index) => {
    if (scores[index].has(letter)) {
      const val = scores[index].get(letter) + 1;
      scores[index].set(letter, val);
    } else {
      scores[index].set(letter, 1);
    }
  });
});

const scoreObjs = [];
scores.forEach(rank => {
  const sortedScores = new Map([...rank.entries()].sort((a, b) => b[1] - a[1]));
  scoreObjs.push(Object.fromEntries(sortedScores));
});

const dictionaryWithScores = data.map(word => {
  let score = 0;
  word.split("").forEach((letter, index) => {
    score += scoreObjs[index][letter];
  });
  return { word, score };
});

fs.writeFileSync("./wordle-dict.txt", dictionaryWithScores.sort((a,b) => b.score - a.score).map(e => e.word).join(","));
