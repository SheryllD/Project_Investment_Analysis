// This is the file where I create the API 

const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express();

app.listen(PORT, () => console.log(`Server running on PORT ${{ PORT }}`))
