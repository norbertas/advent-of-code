import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";

const inputFilePath = "./input";

const file = await Deno.open(inputFilePath);
const markerSize = 14;
for await (const line of readLines(file)) {
  for (let index = 0; index < line.length; index++) {
    const position = index + markerSize;
    const potentialMarker = line.substring(index, position);
    if (new Set(potentialMarker).size === markerSize) {
      console.log(`Marker: ${potentialMarker}`);
      console.log(`Position after marker: ${position}`);
      break;
    }
  }
}
