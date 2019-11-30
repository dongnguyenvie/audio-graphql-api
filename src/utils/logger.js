import * as winston from "winston";
import * as path from "path";
import * as moment from "moment";

const logger = winston.createLogger({
  transports: [
    // info console log
    new winston.transports.Console({
      level: "info",
      name: "info-console",
      colorize: true,
      timestamp: () => moment().format("YYYY-MM-DD HH-mm-ss"),
      formatter: options => `[${options.timestamp()}]: ${options.message || ""}`
    }),
    // info log file
    new winston.transports.File({
      level: "info",
      name: "info-file",
      filename: path.resolve(__basedir, ".logs", "info.log"),
      timestamp: () => moment().format("YYYY-MM-DD HH-mm-ss"),
      formatter: options =>
        `[${options.timestamp()}]: ${options.message || ""}`,
      format: winston.format.simple()
    }),
    // errors console log
    new winston.transports.Console({
      level: "error",
      name: "error-console",
      colorize: true,
      timestamp: () => moment().format("YYYY-MM-DD HH-mm-ss"),
      formatter: options => `[${options.timestamp()}]: ${options.message || ""}`
    }),
    // errors log file
    new winston.transports.File({
      level: "error",
      name: "error-file",
      filename: path.resolve(__basedir, ".logs", "errors.log"),
      timestamp: () => moment().format("YYYY-MM-DD HH-mm-ss"),
      formatter: options =>
        `[${options.timestamp()}]: ${options.message || ""}`,
      format: winston.format.simple()
    })
  ]
});

logger.on('error', function (info) {
  // All `info` log messages has now been logged
  console.log(`extension: info: error`, info)
});

export default logger;
