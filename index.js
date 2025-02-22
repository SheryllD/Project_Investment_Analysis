// This is the file where I create the API

const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

// Routing

app.get("/", (req, res) => {
  res.json("Welcome to the Investment API");
});

app.get("/investor", (res, req) => {

    axios.get("")
        .then((response) => {
            const html = response.data
            console.log(html)
        })

})

app.listen(PORT, () => console.log(`Server running on PORT ${{ PORT }}`));
