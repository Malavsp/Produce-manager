const express = require("express");
const router = express.Router();
const { init } = require("../../database/init.js");

router.get("/init", async (req, res) => {
  await init();
  res.json("Table Created");
});

module.exports = router;
