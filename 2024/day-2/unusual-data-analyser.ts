import { TextLineStream } from "jsr:@std/streams@1.0.8/text-line-stream";

using file = await Deno.open("input");
const readable = file.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TextLineStream());

console.time("Time taken");

const isReportSafe = (report: string[], isProblemDampenerUsed = false) => {
  let levelType: "increasing" | "decreasing";
  let lastLevel: string = report[0];
  let safe = true;

  if (parseInt(report[1]) > parseInt(report[0])) {
    levelType = "increasing";
  } else {
    levelType = "decreasing";
  }

  for (let index = 1; index < report.length; index++) {
    const level = report[index];
    const difference = parseInt(lastLevel) - parseInt(level);

    const isSafeDecreasing = difference > 0 && levelType === "decreasing" &&
      difference <= 3;
    const isSafeIncreasing = difference < 0 && levelType === "increasing" &&
      difference >= -3;

    if (!isSafeIncreasing && !isSafeDecreasing) {
      safe = false;
      break;
    }

    lastLevel = level;
  }

  // Try to dampen the problem if report is not safe
  if (!safe && !isProblemDampenerUsed) {
    for (
      let indexToRemove = 0;
      indexToRemove < report.length;
      indexToRemove++
    ) {
      const isReportSafeAfterDampening = isReportSafe(
        report.toSpliced(indexToRemove, 1),
        true,
      );
      if (isReportSafeAfterDampening) {
        safe = true;
        break;
      }
    }
  }
  return safe;
};

let safeReports = 0;

for await (const data of readable) {
  const report = data.split(" ");
  const reportSafe = isReportSafe(report);
  
  if (reportSafe) {
    safeReports += 1;
  }
}
console.timeEnd("Time taken");

console.log(`Safe reports: ${safeReports}`);
