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

firstArray.sort();
secondArray.sort();

let totalDistance: number = 0;
firstArray.forEach((value, index) => {
  totalDistance += Math.abs(value - secondArray[index]);
});
console.timeEnd("Time taken");

console.log(`Total distance: ${totalDistance}`);
