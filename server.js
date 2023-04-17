const express = require("express");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
// app.get("/", function (request, response) {
//   response.send(
//     "Bahare's Quote Server!  Ask me for /quotes/random, or /quotes"
//   );
// });

// Serve static files from the "public" directory
app.use(express.static("public"));

// Define your routes here
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/favicon.ico", (req, res) => res.status(204));

// all quotes
app.get("/quotes", (req, res) => {
  res.send(quotes);
});
// random quote
app.get("/quotes/random", (req, res) => {
  res.send(pickFromArray(quotes));
});

//function for random item of an array
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// items match with search term

app.get("/quotes/search", (req, res) => {
  const searchedTerm = req.query.term;
  if (searchedTerm) {
    const filteredQuotes = quotes.filter(
      (quote) =>
        quote.quote.toLowerCase().includes(searchedTerm.toLowerCase()) ||
        quote.author.toLowerCase().includes(searchedTerm.toLowerCase())
    );
    res.send(filteredQuotes);
  } else {
    res.send([]);
  }
});
//Start our server so that it listens for HTTP requests!
// const listener = app.listen(process.env.PORT, function () {
//   console.log("Your app is listening on port " + listener.address().port);
// });

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
