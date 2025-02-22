// This is the file where I create the API

const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

// Routing

// Homepage Route
app.get("/", (req, res) => {
  res.json("Welcome to the Investment API");
});

// Investment Route
app.get("/investment", (res, req) => {
  axios.get("").then((response) => {
    const html = response.data;
    console.log(html);
  });
});

app.listen(PORT, () => console.log(`Server running on PORT ${{ PORT }}`));

// What Do I want to Scrape?
// Market Infromation
// Economic Indicators
// Business and Media Statistics
// Different Information

// Keeping tabs on stock:
// The nasdag Stock Market
// Google Finance
// Morningstar
// Yahoo Finance
// https://europe.republic.com/                 *
// https://www.crowdcube.com/                   *    https://www.crowdcube.com/investments

// Financial Reports:
// Bloomberg
// Investopedia
// Forbes
// Reuters
// Financial Times
