import dotenv from "dotenv"

dotenv.config()

const URI = process.env.DB_URL
const SECRET_KEY = process.env.SECRET_KEY;
const MAIL_KEY = process.env.SENDGRID_KEY
const MAIL_FROM = process.env.EMAIL_FROM;
const PORT = process.env.PORT;
export
{
  URI, SECRET_KEY, MAIL_KEY, MAIL_FROM, PORT
}