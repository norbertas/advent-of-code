import { readLines } from "https://deno.land/std@0.167.0/io/buffer.ts";

const inputFilePath = "./input";
const filesystemSize = 70000000;
const updateSize = 30000000;
const part1UpperLimit = 100000;

type FileSystemEntry = {
  name: string;
  size: number;
  type: "folder" | "file";
};

const file = await Deno.open(inputFilePath);
let path = "";
const uniqueFolderNames = new Set<string>();
const fileSystem: FileSystemEntry[] = [];
let totalSize = 0;

for await (const line of readLines(file)) {
  if (line.startsWith("$ cd ..")) {
    path = path.substring(0, path.lastIndexOf("/"));
    if (path.length === 0) path = "/";
  } else if (line.startsWith("$ cd")) {
    path += `${path.endsWith("/") || path.length === 0 ? "" : "/"}${
      line.split(" ").pop()
    }`;
  } else if (line.startsWith("$ ls") || line.startsWith("dir")) {
    continue;
  } else {
    const fileEntry = line.split(" ");
    fileSystem.push({
      name: `${path}${path.length > 1 ? "/" : ""}${fileEntry[1]}`,
      size: Number(fileEntry[0]),
      type: "file",
    });
    totalSize += Number(fileEntry[0]);
  }
  if (line.startsWith("$ cd")) {
    uniqueFolderNames.add(path);
  }
}

let firstPartAnswer = 0;
uniqueFolderNames.forEach((folderName) => {
  let folderSize = 0;
  fileSystem.forEach((element) => {
    if (element.name.startsWith(folderName)) {
      folderSize += element.size;
    }
  });
  fileSystem.push({
    name: folderName,
    size: folderSize,
    type: "folder",
  });
  if (folderSize <= part1UpperLimit) {
    firstPartAnswer += folderSize;
  }
});

console.log(
  `Sum of the total sizes of directories with at most size of ${part1UpperLimit}: ${firstPartAnswer}`,
);

fileSystem.sort((a, b) => {
  return b.size - a.size;
});
const unusedSpace = filesystemSize - totalSize;
const spaceNeeded = updateSize - unusedSpace;
console.log(`Unused space: ${unusedSpace}`);
console.log(`Space needed: ${spaceNeeded}`);
const foldersToDelete = fileSystem.filter((element) =>
  element.type === "folder" && element.size > spaceNeeded
);
console.log(`Size of directory to delete: ${foldersToDelete.pop()?.size}`);
