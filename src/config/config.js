import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT,
  mongodb: {
    url: process.env.MONGO_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "refresh",
    expiresIn: process.env.JWT_EXPIRE || "1d",
  },
  mailerOptions: {
    host: process.env.SMTP_HOST || "smtp.example.com",
    port: process.env.SMTP_PORT || "587",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    secure: false,
  },
};
