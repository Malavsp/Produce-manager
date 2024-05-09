const express = require("express");
const router = express.Router();
const {
  getProduceByPlu,
  getAllProduce,
  addProduce,
  deleteProduceByPlu,
} = require("../data/produce");

// All Produce route
router.get("/all", async (req, res) => {
  try {
    const allProduce = await getAllProduce();
    res.json(allProduce);
  } catch (err) {
    res.status(500).json({ ERROR: err.message });
  }
});

// Get Produce by PLU Code
router.get("/id/:pluCode", async (req, res) => {
  const producePluCode = +req.params.pluCode;
  if (producePluCode) {
    const produce = await getProduceByPlu(producePluCode);
    if (produce) {
      res.json({ produce });
    } else {
      res.status(404).json({ message: "Produce not found" });
    }
  } else {
    res.status(400).json({ message: "Invalid PLU Code" });
  }
});

// Add a New Produce
router.post("/add", async (req, res) => {
  const plu = +req.body?.plu; //?
  const name = req.body?.name;
  const price = +req.body?.price;
  if (plu && name && price) {
    try {
      const addedProduce = await addProduce(plu, name, price);
      res.json({
        Produce: addedProduce,
        msg: "Added to db",
      });
    } catch (err) {
      res.status(409).json({
        ERROR: err.message,
        message: "Produce may already exist",
      });
    }
  } else {
    res.status(400).json({ message: "Incomplete produce data" });
  }
});

// Delete a Produce
router.delete("/id/:pluCode", async (req, res) => {
  const producePluCode = +req.params.pluCode;
  if (producePluCode) {
    try {
      const delProduce = await deleteProduceByPlu(producePluCode);
      res.json(delProduce);
    } catch (err) {
      res.status(500).json({ ERROR: err.message });
    }
  } else {
    res.status(400).json({ msg: "Invalid PLU Code" });
  }
});

module.exports = router;
