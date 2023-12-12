import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export default function (req, res, next) {
  const start = new Date().getDate();

  res.on("finish", () => {
    const duration = new Date().getDate() - start;

    logger.info(
      `Method: ${req.method}, URL: ${req.url}, Status: ${res.statusCode}, Duration: ${duration}`
    );
  });
  next();
}
