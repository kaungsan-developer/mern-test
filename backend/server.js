import express from "express";
import "dotenv/config";
import cors from "cors";
import connect_db from "./config/db.js";
import noteRoute from "./routes/noteRoute.js";
import rateLimiter from "./middlewares/rateLimiter.js";
const app = express();

await connect_db();

app.use(express.json());
app.use(cors());
app.use(rateLimiter);
app.use("/api/notes", noteRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
