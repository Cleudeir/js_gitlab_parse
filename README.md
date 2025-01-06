## Summary

This project involves parsing HTML data from various sources.  One script processes an HTML file containing project commit information, extracts relevant data (project name, commit description, date, time), cleans, sorts, and formats it into a JSON file (`parsedData.json`). Another component focuses on building an HTML parser itself, currently without external dependencies.  The `parsedData.json` file structures the commit data chronologically, grouping commits by date for analysis and reporting. The project uses Node.js, regular expressions, and potentially future improvements include more robust parsing libraries and enhanced error handling.  A `package-lock.json` file indicates the project's basic structure, version, and license.  The `file.html` example shows GitLab activity data, illustrating the type of HTML the commit parsing script could handle.


## Tech Stack

Node.js, JavaScript, Regular Expressions, HTML, JSON, potentially `cheerio` (future),  Webpack (inferred from `file.html`),  GitLab's internal CSS framework (inferred),  Snowplow, Google Analytics, Sentry (inferred from `file.html`),  Timeago library (inferred from `file.html`).
