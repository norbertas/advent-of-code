import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";

const inputFilePath = "./input";

const priorityList = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const getPriority = (item: string) => {
  const indexInPrioList = priorityList.indexOf(item);
  if (indexInPrioList !== -1) {
    return indexInPrioList + 1;
  } else {
    return indexInPrioList;
  }
};

const getCommonElement = (groups: string[]): string => {
  for (const firstGroupMember of groups[0]) {
    if (
      groups[1].includes(firstGroupMember) &&
      groups[2].includes(firstGroupMember)
    ) {
      return firstGroupMember;
    }
  }
  return "";
};

const file = await Deno.open(inputFilePath);
let totalPrioritySum = 0;
let totalGroupPrioritySum = 0;
let currentGroupIndex = 0;

let currentGroup: string[] = [];

for await (const line of readLines(file)) {
  const midPoint = line.length / 2;
  const firstHalf = line.slice(0, midPoint).split("");
  const secondHalf = line.slice(midPoint).split("");
  const sameItemTypes: string[] = [];
  for (const item of firstHalf) {
    if (secondHalf.includes(item) && !sameItemTypes.includes(item)) {
      sameItemTypes.push(item);
    }
  }
  for (const itemType of sameItemTypes) {
    const priority = getPriority(itemType);
    totalPrioritySum += priority;
  }

  if (currentGroupIndex !== 2) {
    currentGroup.push(line);
    currentGroupIndex += 1;
  } else {
    currentGroup.push(line);
    const groupBadge = getCommonElement(currentGroup);
    const groupPriority = getPriority(groupBadge);
    totalGroupPrioritySum += groupPriority;

    currentGroupIndex = 0;
    currentGroup = [];
  }
}
console.log(`Total priority sum: ${totalPrioritySum}`);
console.log(`Total group priority sum: ${totalGroupPrioritySum}`);
