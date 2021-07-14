const electronMainConfig = require("./webpack.electron-main");
const electronRendererConfig = require('./webpack.electron-renderer');

module.exports = [
    electronMainConfig,
  electronRendererConfig
];