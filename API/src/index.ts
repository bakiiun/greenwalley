import express from "express";
import logger from "morgan";
import cors from "cors";
import moment from "moment";
import config from "./configs/config";
import { dbConnect as mysql } from "./modules/database/mysql/query_module";

import routes from "./routes/v1/routes";

const app = express();

//* MIDDLEWARE

app.use(express.json());
app.use(cors());
app.use(logger("dev"));
moment.locale("tr");
moment.defaultFormat = "YYYY-MM-DD HH:mm:ss";

//*GLOBAL VERIABLES

declare global {
  namespace Express {
    interface Request {
      userSession?: { id: String; username: String; type: String };
    }
  }
}

//* DATABASE CONNECT

try {
  mysql.connect((error) => {
    if (error) {
      throw error;
    }
    return;
  });
} catch (error) {
  console.log(error);
}

//* HELLO WORLD

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello World!" });
});

//* ROUTES

app.use("/api", routes);

//* CATCH ERROR

app.use((req, res) => {
  res.status(404).json({ title: "Error 404", message: "Not found!" });
});

app.use((error: any, req: any, res: any, next: any) => {
  const statusCode = error.status || 500;
  console.log(error.errorMsg);
  res.status(statusCode).json({ message: error.message });
});

//* START API

const serverPort: Number = Number(config.server.port);
app.listen(serverPort, () => console.log(`Server listening on http://localhost:${serverPort}`));
