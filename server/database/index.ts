import dotenv from "dotenv";

dotenv.config();

const localLink = "mongodb://localhost:27017/crsp";

export const databaseLink =
  process.env.NODE_ENV === "production" ? process.env.WEB_LINK : localLink;

export const config = {
  link: databaseLink,
  options: {
    useNewUrlParser: true,
    autoIndex: false,
    useUnifiedTopology: true,
  },
};

export const TEST_CONTEXT =
  process.env.NODE_ENV === "production" ? "Production Mode" : process.env.TEST;

// Secret
export const SECRET =
  process.env.NODE_ENV === "production" ? process.env.SECRET : "secret";
