const express = require("express");
const auth = require("../midlleware/auth.js");
const router = express.Router();

router.get("/admin", auth("admin"), (req, res) => {
  res.json({ message: "Admin Dashboard" });
});

router.get("/editor", auth("editor"), (req, res) => {
  res.json({ message: "Editor Dashboards" });
});

router.get("/viewer", auth("viewer"), (req, res) => {
  res.json({ message: "Viewer Dashboard" });
});

module.exports = router;
