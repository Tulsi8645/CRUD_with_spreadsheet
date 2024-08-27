const sheetModel = require("../models/sheetsModel");

// Create a new entry (POST)
exports.createEntry = async (req, res) => {
  const { username, email, message, image } = req.body;

  try {
    await sheetModel.appendRow([username, email, message, image]);
    res.json({ message: "Successfully submitted!" });
  } catch (error) {
    console.error("Error occurred while creating entry:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

// Get all entries (GET)
exports.getAllEntries = async (req, res) => {
  try {
    const data = await sheetModel.getRows();
    res.json(data);
  } catch (error) {
    console.error("Error occurred while fetching entries:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

// Get a single entry by row number (GET)
exports.getEntryByRowNumber = async (req, res) => {
  const rowNumber = parseInt(req.params.rowNumber, 10);
  try {
    const row = await sheetModel.getRowByNumber(rowNumber);
    res.json(row);
  } catch (error) {
    console.error("Error occurred while fetching entry:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

// Update an existing entry by row number (PUT)
exports.updateEntry = async (req, res) => {
  const rowNumber = parseInt(req.params.rowNumber, 10);
  const { username, email, message, image } = req.body;

  try {
    const updated = await sheetModel.updateRow(rowNumber, [
      username,
      email,
      message,
      image,
    ]);
    if (updated) {
      res.json({ message: "Entry successfully updated." });
    } else {
      res.status(404).json({ message: "Entry not found." });
    }
  } catch (error) {
    console.error("Error occurred while updating entry:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

// Delete an entry by row number (DELETE)
exports.deleteEntry = async (req, res) => {
  const rowNumber = parseInt(req.params.rowNumber, 10);

  try {
    const deleted = await sheetModel.deleteRow(rowNumber);
    if (deleted) {
      res.json({ message: "Entry successfully deleted." });
    } else {
      res.status(404).json({ message: "Entry not found." });
    }
  } catch (error) {
    console.error("Error occurred while deleting entry:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};


