const express = require("express");
const app = express();
const sheetsRoutes = require("./routes/sheetsRoutes");
const authRoutes = require("./routes/authRoutes");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use("/api", sheetsRoutes);
app.use("/api", authRoutes);



// Default route for home page
app.get("/", (req, res) => {
  res.render("index");
});


// Route to render the register page
app.get('/register', (req, res) => {
  res.render('register'); // This renders the register.ejs file
});

// Route to render the login page
app.get('/login', (req, res) => {
  res.render('login'); // This renders the login.ejs file
});

// Route to render the data view page
app.get('/data', (req, res) => {
  res.render('data'); // This renders the data.ejs file
});



app.listen(3000, () => console.log("Server running on port 3000"));
