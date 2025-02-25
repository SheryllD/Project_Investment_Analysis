require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const sources = [
  {
    name: "crunchbase",
    address: "https://www.crunchbase.com",
    base: "https://www.crunchbase.com",
  },
  {
    name: "techcrunch",
    address: "https://techcrunch.com",
    base: "https://techcrunch.com",
  },
  {
    name: "cbinsights",
    address: "https://www.cbinsights.com",
    base: "https://www.cbinsights.com",
  },
  {
    name: "pitchbook",
    address: "https://pitchbook.com/news",
    base: "https://pitchbook.com",
  },
  {
    name: "angelList",
    address: "https://www.angellist.com/",
    base: "https://www.angellist.com/",
  },
  {
    name: "fundingRounds",
    address: "https://www.crunchbase.com/funding-rounds",
    base: "https://www.crunchbase.com",
  },
  {
    name: "startup-map-berlin",
    address:
      "https://startup-map.berlin/transactions.rounds/f/growth_stages/not_mature/regions/anyof_Berlin%2FBrandenburg%20Metropolitan%20Region/rounds/not_GRANT_SPAC%20PRIVATE%20PLACEMENT/tags/not_outside%20tech?showStats=YEAR&statsType=rounds",
    base: "https://startup-map.berlin",
  },
];

async function scrapeFundingData() {
  const fundingData = [];

  for (const source of sources) {
    try {
      console.log(`Scraping ${source.name}...`);
      const response = await axios.get(source.address, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
        },
      });

      const html = response.data;
      const $ = cheerio.load(html);

      $(".funding-round").each((i, el) => {
        const company = $(el).find(".company-name").text().trim();
        const amount = $(el).find(".funding-amount").text().trim();
        const round = $(el).find(".funding-type").text().trim();
        const investors = $(el).find(".investors").text().trim().split(",");
        const market = $(el).find(".market").text().trim();
        const location = $(el).find(".location").text().trim();
        fundingData.push({
          company,
          amount,
          round,
          investors,
          market,
          location,
          source: source.name,
        });
      });
    } catch (error) {
      console.log(`Error scraping ${source.name}:`, error.message);
    }
  }
  return fundingData;
}

app.get("/funding", async (req, res) => {
  const data = await scrapeFundingData();
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
