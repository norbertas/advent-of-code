import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";

const inputFilePath = "./input";

const file = await Deno.open(inputFilePath);
const cratesInput: string[][] = [];
const commands: string[] = [];
for await (const line of readLines(file)) {
  if (line.startsWith("move")) {
    commands.push(line);
  } else {
    const crates = line.match(/.{1,4}/g)?.map((item) =>
      item.trim().replace("[", "").replace("]", "")
    );
    if (crates) {
      cratesInput.push(crates);
    }
  }
}
cratesInput.pop();

const crateStacks = cratesInput[0].map((_val, index) =>
  cratesInput.map((row) => row[index]).reverse()
);
crateStacks.forEach((crateStack) => {
  while (crateStack.indexOf("") !== -1) {
    crateStack.pop();
  }
});

commands.forEach((command) => {
  const commandNumbers = command.match(/\d+/g)?.map((item) => Number(item));
  if (commandNumbers) {
    // Create Mover 9000
    // for (let index = 0; index < commandNumbers[0]; index++) {
    //   const crate = crateStacks[commandNumbers[1] - 1].pop();
    //   if (crate) {
    //     crateStacks[commandNumbers[2] - 1].push(crate);
    //   }
    // }
    const cratesToMove = crateStacks[commandNumbers[1] - 1].splice(
      crateStacks[commandNumbers[1] - 1].length - commandNumbers[0],
      commandNumbers[0],
    );
    crateStacks[commandNumbers[2] - 1].push(...cratesToMove);
  }
});
let answer = "";
crateStacks.forEach((crateStack) => {
  answer += crateStack[crateStack.length - 1];
});
console.log(answer);
