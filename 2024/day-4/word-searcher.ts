import { TextLineStream } from "jsr:@std/streams@1.0.8/text-line-stream";

using file = await Deno.open("input");

const inputMatrix: string[][] = [];

const readable = file.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());

for await (const data of readable) {
  inputMatrix.push(data.split(""));
}

console.time("Time taken");

// Start with all the rows as search input
const searchInput: string[][] = inputMatrix.slice();

// Find diagonals and add to search input
for (let index = 0; index < inputMatrix.length; index++) {
  const diagonal: string[] = [];
  const anotherDiagonal: string[] = [];
  for (
    let row = index, column = 0;
    row < inputMatrix.length;
    column++, row++
  ) {
    diagonal.push(inputMatrix[row][column]);
    if (column !== row) {
      anotherDiagonal.push(inputMatrix[column][row]);
    }
  }
  if (diagonal.length > 0) searchInput.push(diagonal);
  if (anotherDiagonal.length > 0) {
    searchInput.push(anotherDiagonal);
  }
}

// Add columns to search input
for (let index = 0; index < inputMatrix.length; index++) {
  const column: string[] = [];
  for (let subIndex = 0; subIndex < inputMatrix.length; subIndex++) {
    column.push(inputMatrix[subIndex][index]);
  }
  searchInput.push(column);
}

// Find reverse diagonals and add to search input
for (let index = 0; index < inputMatrix.length; index++) {
  const diagonal: string[] = [];
  const anotherDiagonal: string[] = [];

  for (
    let row = 0, column = inputMatrix.length - index - 2, runs = index;
    runs < inputMatrix.length - 1;
    column--, row++, runs++
  ) {
    diagonal.push(inputMatrix[row][column]);
  }

  for (
    let column = inputMatrix.length - 1, row = index, runs = index;
    runs < inputMatrix.length;
    column--, row++, runs++
  ) {
    anotherDiagonal.push(inputMatrix[row][column]);
  }
  if (diagonal.length > 0) searchInput.push(diagonal);
  if (anotherDiagonal.length > 0) {
    searchInput.push(anotherDiagonal);
  }
}

// Solution only for 1*
let matchesFound = 0;
searchInput.forEach((element) => {
  matchesFound += element.join("").matchAll(/XMAS/g).toArray().length;
  matchesFound +=
    element.slice().reverse().join("").matchAll(/XMAS/g).toArray().length;
});

console.timeEnd("Time taken");
console.log(`XMAS word matches found - ${matchesFound}`);
