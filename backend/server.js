const { loadFAISSFromMongoDB } = require("./services/faissLoaderService");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

const path = require("path");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/pdf", require("./routes/pdfRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));


mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);

    await loadFAISSFromMongoDB();

    console.log("🚀 FAISS is ready!");
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});