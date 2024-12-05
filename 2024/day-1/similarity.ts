import { TextLineStream } from "jsr:@std/streams@1.0.8/text-line-stream";

using file = await Deno.open("input");
const readable = file.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());

const firstArray: number[] = [], secondArray: number[] = [];

console.time("Time taken");
for await (const data of readable) {
  const lineNumbers = data.split("   ");
  firstArray.push(parseInt(lineNumbers[0]));
  secondArray.push(parseInt(lineNumbers[1]));
}

// Simple cache to save some time
const cache: Record<number, number> = {};

const countOccurances = (item: number) => {
  if (!cache[item]) {
    let count = 0;
    secondArray.forEach((element) => {
      if (element === item) {
        count += 1;
      }
    });
    cache[item] = count;
  }
  return cache[item];
};

let similarityScore = 0;

firstArray.forEach((element) => {
  similarityScore += element * countOccurances(element);
});

console.timeEnd("Time taken");

console.log(`Similarity score: ${similarityScore}`);
