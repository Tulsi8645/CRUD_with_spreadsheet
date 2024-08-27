const express = require("express");
const router = express.Router();
const sheetsController = require("../controllers/sheetsController");

// Create a new entry or update an existing entry
router.post("/submit", sheetsController.createEntry); // For new entries
router.put("/submit/:rowNumber", sheetsController.updateEntry); // For updates

// Get all entries
router.get("/data", sheetsController.getAllEntries);

// Get an entry by row number
router.get("/data/:rowNumber", sheetsController.getEntryByRowNumber);

// Delete an entry by row number
router.delete("/data/:rowNumber", sheetsController.deleteEntry);

module.exports = router;
