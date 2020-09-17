const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${label}] ${level}: ${message}`;
});

path = module.filename.split("/").slice(-2).join('/');

const logger = createLogger({
  format: combine(
    format.colorize(),
    label({ label: path}),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]
});

module.exports = logger;
