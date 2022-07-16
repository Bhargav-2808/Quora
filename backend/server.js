import express, {static as stc}  from "express";
import cors from "cors";
import path  from "path";
const app = express();
import bodyParser from "body-parser";
const PORT = 8000;
import  connect  from "./db.js";
import router from "./routes/index.js";
const __dirname = path.resolve(path.dirname('')); 
//database connection

connect();

//middle ware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());

//cors
// app.use((req, res, next) => {
//   req.header("Access-Control-Allow-Origin", "*");
//   req.header("Access-Control-Allow-Headers", "*");
//   next();
// });

//routes
app.use("/api", router);

// app.use("/uploads", stc(path.join(__dirname, "/../uploads")));
// app.use(stc(path.join(__dirname, "/../frontend/public")));

// app.get("*", (req, res) => {
//   try {
//     res.sendFile(path.join(`${__dirname}/../frontend/public/index.html`));
//   } catch (e) {
//     res.send("Oops! unexpected error");
//   }
// });



//server listening
app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on port no ${PORT}`);
});
