const bcrypt = require("bcrypt");
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

// Define a salt rounds for hashing
const saltRounds = 10;

const registerUser = async (username, password) => {
  const sheets = await getClient();
  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: { values: [[username, hashedPassword]] },
  });
};

const authenticateUser = async (username, password) => {
  const sheets = await getClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A:B",
  });
  const rows = response.data.values;
  const user = rows.find((row) => row[0] === username);
  if (user) {
    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user[1]);
    return isMatch;
  }
  return false;
};

module.exports = { registerUser, authenticateUser };
