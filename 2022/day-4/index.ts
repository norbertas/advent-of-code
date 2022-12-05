import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";

const inputFilePath = "./input";

const expandSegment = (segment: number[]) => {
  const expandedSegment = [];
  for (let index = segment[0]; index <= segment[1]; index++) {
    expandedSegment.push(index);
  }
  return expandedSegment;
};

const contains = (
  firstSegment: number[],
  secondSegment: number[],
  fullCheck = true,
) => {
  let overlap = false;
  if (firstSegment.length >= secondSegment.length) {
    if (fullCheck) {
      overlap = secondSegment.every((value) => firstSegment.includes(value));
    } else {
      overlap = secondSegment.some((value) => firstSegment.includes(value));
    }
  } else {
    if (fullCheck) {
      overlap = firstSegment.every((value) => secondSegment.includes(value));
    } else {
      overlap = firstSegment.some((value) => secondSegment.includes(value));
    }
  }
  return overlap;
};

const file = await Deno.open(inputFilePath);

let fullOverlaps = 0;
let partialOverlaps = 0;
for await (const line of readLines(file)) {
  const segments = line.split(",");
  const firstElf = expandSegment(
    segments[0].split("-").map((item) => Number(item)),
  );

  const secondElf = expandSegment(
    segments[1].split("-").map((item) => Number(item)),
  );

  if (contains(firstElf, secondElf, true)) {
    fullOverlaps += 1;
  }
  if (contains(firstElf, secondElf, false)) {
    partialOverlaps += 1;
  }
}
console.log(`Total full overlap count ${fullOverlaps}`);
console.log(`Total partial overlap count ${partialOverlaps}`);
