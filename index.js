const fs = require("fs");

const regex =
  /<time .*?title="(.*?)".*?datetime="(.*?)".*?class="project-name">([^<]+).*?<a class="commit-sha".*?<\/a>.*?.(.*?)<\/div>/gs;

fs.readFile("file.html", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const matches = [...data.matchAll(regex)];

  const parsedData = matches.map((match, index) => {
    if (index === 0) {
      console.log("match: ", match[1]);
    }
    const [formattedDateTime] = match[2].split(" ");
    const [date, time] = formattedDateTime.split("T");
    const [year, month, day] = date.split("-");
    let [hour, minute] = time.split(":");
    hour = Number(hour) - 3;
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${parseInt(hour, 10)}:${minute}`;
    return {
      projectName: match[3],
      commitDescription: match[4],
      commitDate: formattedDate,
      formattedDateTime,
      commitHours: formattedTime,
    };
  });

  // Sort the parsed data by commitDate and then by commitHours
  parsedData.sort((a, b) => {
    const dateComparison =
      new Date(b.formattedDateTime) - new Date(a.formattedDateTime);
    if (dateComparison !== 0) return dateComparison;
    return a.commitHours.localeCompare(b.commitHours, undefined, {
      numeric: true,
    });
  });

  let sortedByDate = parsedData.reduce((acc, item) => {
    const dateKey = item.commitDate;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push({
      projectName: item.projectName,
      commitDescription: item.commitDescription
        .replace(/\s+/g, " ")
        .trim()
        .replace("· ", ""),
      commitHours: item.commitHours,
    });
    return acc;
  }, {});

  const reverse = {};
  for (const key in sortedByDate) {
    if (Object.prototype.hasOwnProperty.call(sortedByDate, key)) {
      const element = sortedByDate[key];
      reverse[key] = element.reverse();
    }
  }

  fs.writeFile("parsedData.json", JSON.stringify(reverse, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    console.log("Parsed data has been saved to parsedData.json");
  });
});
