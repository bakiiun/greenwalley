import "dotenv/config";

//* VERIABLES

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || "localhost";
const MYSQL_URL = process.env.MYSQL_URL || "localhost";
const DB_TYPE: String = "mysql";
const BCRYPT_HASH = process.env.BCRYPT_HASH || 10;
const JWT_PRIV_KEY = process.env.JWT_PRIV_KEY;
const JWT_PUB_KEY = process.env.JWT_PUB_KEY;
const JWT_DURATION = process.env.JWT_DURATION || null;

//* FUNCTIONS

const config = {
  server: { port: SERVER_PORT, dbType: DB_TYPE },
  mongodb: { uri: MONGODB_URL },
  mysql: { uri: MYSQL_URL },
  bcrypt: { hash: BCRYPT_HASH },
  jwt: { secretKey: JWT_PRIV_KEY, publicKey: JWT_PUB_KEY, duration: JWT_DURATION },
};

export default config;
