const corruptedMemory = await Deno.readTextFile("input");

console.time("Time taken");
let result = 0;
const multiRegex = /mul\(\d*,\d*\)|don't\(\)|do\(\)/g
let currentState:'do'|'dont' = 'do'

const allInstructions = [...corruptedMemory.matchAll(multiRegex)];

allInstructions.forEach((instruction) => {
  const instructionString = instruction.join();
  if (instructionString.startsWith('do(')) {
    currentState = 'do'
  }
  if (instructionString.startsWith('don\'t(')) {
    currentState = 'dont'
  }
  if (instructionString.startsWith('mul') && currentState === 'do') {
    const numbers = instructionString.replace('mul(', '').replace(')', '').split(',');
    result += parseInt(numbers[0]) * parseInt(numbers[1]);
  }
});

console.timeEnd("Time taken");
console.log(`Result ${result}`)
