const fs = require("node:fs");
const readline = require("node:readline");

const MOVES = {
  ROCK: "A",
  PAPER: "B",
  SCISSORS: "C",
};

const OUTCOMES = {
  LOSS: "X",
  DRAW: "Y",
  WIN: "Z",
};

const MOVE_SCORES = {
  A: 1,
  B: 2,
  C: 3,
};

const OUTCOME_SCORES = {
  X: 0,
  Y: 3,
  Z: 6,
};

const calculatPlayerScore = (elfMove, outcome) => {
  let score = 0;
  score += OUTCOME_SCORES[outcome];

  if (outcome === OUTCOMES.DRAW) {
    score += MOVE_SCORES[elfMove];
  }

  if (outcome === OUTCOMES.WIN) {
    if (elfMove === MOVES.ROCK) {
      score += MOVE_SCORES[MOVES.PAPER];
    } else if (elfMove === MOVES.PAPER) {
      score += MOVE_SCORES[MOVES.SCISSORS];
    } else if (elfMove === MOVES.SCISSORS) {
      score += MOVE_SCORES[MOVES.ROCK];
    }
  }

  if (outcome === OUTCOMES.LOSS) {
    if (elfMove === MOVES.ROCK) {
      score += MOVE_SCORES[MOVES.SCISSORS];
    } else if (elfMove === MOVES.PAPER) {
      score += MOVE_SCORES[MOVES.ROCK];
    } else if (elfMove === MOVES.SCISSORS) {
      score += MOVE_SCORES[MOVES.PAPER];
    }
  }
  return score;
};

async function processLineByLine() {
  const fileStream = fs.createReadStream("input");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let totalScore = 0;
  for await (const line of rl) {
    const items = line.split(" ");
    totalScore += calculatPlayerScore(items[0], items[1]);
  }

  console.log(`Total player score ${totalScore}`);
}

processLineByLine();
