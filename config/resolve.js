const path = require("path");
const ROOT = path.resolve(__dirname, "../");
const APP_DIR = path.resolve(ROOT, "src");
const BUILD_DIR = path.resolve(ROOT, "dist");

module.exports = {
  alias: {
    Src: APP_DIR,
    Style: APP_DIR + "/assets/style"
  },
  extensions: ["*", ".js", ".json"]
};
