import { TextLineStream } from "jsr:@std/streams@1.0.8/text-line-stream";

using file = await Deno.open("input");
type PageNumbers = Record<string, string[]>;

const pageNumbersLowerThan: PageNumbers = {},
  pageNumbersHigherThan: PageNumbers = {};

const readable = file.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());

let middleSum = 0;

for await (const data of readable) {
  if (data.indexOf("|") >= 0) {
    const pageNumberItems = data.split("|");
    if (pageNumbersLowerThan[pageNumberItems[0]]) {
      pageNumbersLowerThan[pageNumberItems[0]].push(pageNumberItems[1]);
    } else {
      pageNumbersLowerThan[pageNumberItems[0]] = [pageNumberItems[1]];
    }

    if (pageNumbersHigherThan[pageNumberItems[1]]) {
      pageNumbersHigherThan[pageNumberItems[1]].push(pageNumberItems[0]);
    } else {
      pageNumbersHigherThan[pageNumberItems[1]] = [pageNumberItems[0]];
    }
  }
  if (data.indexOf(",") >= 0) {
    //console.log(data);
    const pages = data.split(",");
    let isCorrect = true;
    for (let index = 0; index < pages.length; index++) {
      const element = pages[index];
      //console.log(`Lower than ${element}: ${pageNumbersLowerThan[element]}`);
      for (let subIndex = index + 1; subIndex < pages.length; subIndex++) {
        //console.log(`Comparing with ${pages[subIndex]}`);
        if (
          !pageNumbersLowerThan[element] ||
          !pageNumbersLowerThan[element].includes(pages[subIndex])
        ) {
          isCorrect = false;
          //console.log(`not correct`);
          break;
        }
      }
      if (!isCorrect) break;
    }
    if (isCorrect) {
      const middle = pages[Math.floor(pages.length / 2)];
      //console.log(`pages in ${data} is in correct order. Middle is ${middle}`);
      middleSum += parseInt(middle);
    }
    //console.log("---------");
  }
}

console.log(`Sum of middles is ${middleSum}`);
