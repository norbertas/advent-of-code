const corruptedMemory = await Deno.readTextFile("input");

const calculatePart1 = (corruptedMemory: string) => {
  let result = 0;
  const multiRegex = /mul\(\d*,\d*\)/g;

  const allInstructions = [...corruptedMemory.matchAll(multiRegex)];

  allInstructions.forEach((instruction) => {
    const instructionString = instruction.join();
    if (instructionString.startsWith("mul")) {
      const numbers = instructionString.replace("mul(", "").replace(")", "")
        .split(",");
      result += parseInt(numbers[0]) * parseInt(numbers[1]);
    }
  });
  return result;
};
const calculatePart2 = (corruptedMemory: string) => {
  let result = 0;
  const multiRegex = /mul\(\d*,\d*\)|don't\(\)|do\(\)/g;
  let currentState: "do" | "dont" = "do";

  const allInstructions = [...corruptedMemory.matchAll(multiRegex)];

  allInstructions.forEach((instruction) => {
    const instructionString = instruction.join();
    if (instructionString.startsWith("do(")) {
      currentState = "do";
    }
    if (instructionString.startsWith("don't(")) {
      currentState = "dont";
    }
    if (instructionString.startsWith("mul") && currentState === "do") {
      const numbers = instructionString.replace("mul(", "").replace(")", "")
        .split(",");
      result += parseInt(numbers[0]) * parseInt(numbers[1]);
    }
  });
  return result;
};

console.time("Time taken, part 1");
const part1result = calculatePart1(corruptedMemory);
console.timeEnd("Time taken, part 1");
console.log(`Part 1 result: ${part1result}`);

console.time("Time taken, part 2");
const part2result = calculatePart2(corruptedMemory);
console.timeEnd("Time taken, part 2");
console.log(`Part 2 result: ${part2result}`);
