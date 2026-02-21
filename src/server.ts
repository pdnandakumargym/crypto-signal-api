import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import signalRoutes from "./routes/signal.routes";
import { startSignalJob } from "./jobs/signal.job";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/signal", signalRoutes);

const PORT = parseInt(process.env.PORT || "3000", 10);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   startSignalJob();
// });


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});