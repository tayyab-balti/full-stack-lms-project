const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./src/config/db");

const router = require("./src/routes/auth.routes");
const subjectRouter = require("./src/routes/subject.routes");
const videoRouter = require("./src/routes/video.routes");

const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

app.use("/api/auth", router);
app.use("/api/subjects", subjectRouter);
app.use("/api/videos", videoRouter);

app.use("/public/uploads", express.static("public/uploads")); // newly uploaded images

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
