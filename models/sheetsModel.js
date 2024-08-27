const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const getClient = async () => {
  const client = await auth.getClient();
  return google.sheets({ version: "v4", auth: client });
};

const spreadsheetId = "1xj17j05VLclquDwNduG-RVmNtaoSM03gnUDWeKxREw4";

const appendRow = async (data) => {
  const sheets = await getClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet2!A:D", // Ensure this range matches the column layout
    valueInputOption: "USER_ENTERED",
    resource: { values: [data] },
  });
};

const getRows = async () => {
  const sheets = await getClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet2!A:D",
  });
  return response.data.values;
};

const getRowByNumber = async (rowNumber) => {
  try {
    const sheets = await getClient();
    const headerRowCount = 1;
    const sheetRowIndex = rowNumber + headerRowCount;

    const range = `Sheet2!A${sheetRowIndex}:D${sheetRowIndex}`;
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const row = response.data.values;
    if (!row || row.length === 0) {
      throw new Error("Entry not found");
    }

    return row[0];
  } catch (error) {
    console.error("Error fetching row:", error);
    throw error;
  }
};

const updateRow = async (rowNumber, data) => {
  try {
    const sheets = await getClient();
    const headerRowCount = 1;
    const sheetRowIndex = rowNumber + headerRowCount - 1;

    const range = `Sheet2!A${sheetRowIndex + 1}:D${sheetRowIndex + 1}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      resource: { values: [data] },
    });

    console.log("Row successfully updated");
    return true;
  } catch (error) {
    console.error("Error during update operation:", error);
    throw error;
  }
};

const deleteRow = async (rowNumber) => {
  try {
    const sheets = await getClient();
    const headerRowCount = 1;
    const sheetRowIndex = rowNumber + headerRowCount - 1;

    const batchUpdateRequest = {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId: 673401047, // Use the correct sheetId for "Sheet2"
              dimension: "ROWS",
              startIndex: sheetRowIndex,
              endIndex: sheetRowIndex + 1,
            },
          },
        },
      ],
    };

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: batchUpdateRequest,
    });

    console.log("Row successfully deleted");
    return true;
  } catch (error) {
    console.error("Error during delete operation:", error);
    throw error;
  }
};

module.exports = { appendRow, getRows, getRowByNumber, updateRow, deleteRow };
