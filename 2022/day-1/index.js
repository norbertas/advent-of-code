const fs = require('node:fs');
const readline = require('node:readline');


async function processLineByLine() {
  const fileStream = fs.createReadStream('input');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });


const elfs = [];
let currentElf = [];
  for await (const line of rl) {
    if (line === ''){
      let currentElfTotal = 0;
      currentElf.forEach(elfCalories => {
        currentElfTotal += elfCalories;
      });
      elfs.push(currentElfTotal);
      currentElf = [];
    } else {
      const calories = Number(line);
      if (calories !== Number.NaN) {
        currentElf.push(calories);
      }
    }
  }
  elfs.sort();
  elfs.reverse();

  console.log(`Elf carrying the most Calories carries ${elfs[0]}`);
  console.log(`Top 3 elfs carrying the most Calories carries together ${elfs[0]+elfs[1]+elfs[2]}`);
}

processLineByLine();
