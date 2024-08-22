const fs = require("fs");

const regex =
  /<span class="project-name">([^<]+).*?<div class="commit-row-title">.*?·\s*(.*?)<\/div>.*?<time .*?datetime="([^"]+)"/gs;

fs.readFile("file.html", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const matches = [...data.matchAll(regex)];

  const parsedData = matches.map((match) => {
    const [date, time] = match[3].split("T");
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(":");
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hour}:${minute}`;

    return {
      projectName: match[1],
      commitDescription: match[2].split("\n")[0],
      commitDate: formattedDate,
      commitHours: formattedTime,
    };
  });

  // Sort the parsed data by commitDate
  parsedData.sort(
    (a, b) =>
      new Date(
        `${a.commitDate.split("/").reverse().join("-")}T${a.commitHours}`
      ) -
      new Date(
        `${b.commitDate.split("/").reverse().join("-")}T${b.commitHours}`
      )
  );

  const sortedByDate = parsedData.reduce((acc, item) => {
    const dateKey = item.commitDate;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push({
      projectName: item.projectName,
      commitDescription: item.commitDescription,
      commitHours: item.commitHours,
    });
    return acc;
  }, {});

  fs.writeFile(
    "parsedData.json",
    JSON.stringify(sortedByDate, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return;
      }
      console.log("Parsed data has been saved to parsedData.json");
    }
  );
});
