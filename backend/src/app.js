const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const projectRoutes = require("./routes/projectRoutes");
const certificationRoutes = require("./routes/certificationRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const verificationRoutes = require("./routes/verificationRoutes");
const endorsementRoutes=require("./routes/endorsementRoutes");
const dashboardRoutes=require("./routes/dashboardRoutes");
const userRoutes=require("./routes/userRoutes");
const { protect } = require("./middleware/authMiddleware");
const authorizeRoles = require("./middleware/roleMiddleware");

const app = express();


// MIDDLEWARES
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));


// STATIC FILES
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/certifications", certificationRoutes);

app.use("/api/achievements", achievementRoutes);

app.use("/api/verifications", verificationRoutes);

app.use("/api/endorsements", endorsementRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/users", userRoutes);

// HOME ROUTE
app.get("/", (req, res) => {
  res.json({
    message: "VeriFolio API Running Successfully",
  });
});


// ADMIN TEST ROUTE
app.get(
  "/api/admin/test",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);


module.exports = app;