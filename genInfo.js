// eslint-disable-next-line no-undef
const { writeFileSync } = require("fs");

const info = {
  // eslint-disable-next-line no-undef
  username: process.argv[2].split("/")[0],
  job: "前端工程师",
};

writeFileSync(
  "info.ts",
  `export default {
    username: "${info.username}",
    job: "${info.job}"
  }
`
);
