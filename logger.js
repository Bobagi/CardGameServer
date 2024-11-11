const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

// Formato personalizado que converte objetos complexos para JSON automaticamente
const jsonFormat = printf(({ level, message, timestamp, ...meta }) => {
  // Converte meta para JSON se contiver objetos adicionais
  const additionalInfo = Object.keys(meta).length
    ? JSON.stringify(meta, null, 2)
    : "";
  return `${timestamp} [${level}]: ${message} ${additionalInfo}`;
});

const logger = createLogger({
  level: "debug",
  format: combine(
    colorize(), // Colore os logs por nível
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Adiciona o timestamp
    jsonFormat // Usa o formato que converte objetos automaticamente
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
