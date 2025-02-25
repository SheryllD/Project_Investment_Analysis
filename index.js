// to run it pls use node server.js in your terminal 

require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const puppeteer = require("puppeteer");

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

async function scrapeWithPuppeteer(url) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );
  await page.setExtraHTTPHeaders({
    "accept-language": "en-US,en;q=0.9",
  });

  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    const content = await page.content();
    await browser.close();
    return content;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    await browser.close();
    return null;
  }
}

async function scrapeFundingData() {
  const fundingData = [];

  for (const source of sources) {
    try {
      let html;

      if (
        [
          "crunchbase",
          "pitchbook",
          "fundingRounds",
          "startup-map-berlin",
        ].includes(source.name)
      ) {
        console.log(`Scraping ${source.name} with Puppeteer...`);
        html = await scrapeWithPuppeteer(source.address);
      } else {
        console.log(`Scraping ${source.name} with Axios...`);
        const response = await axios.get(source.address, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            Connection: "keep-alive",
          },
        });
        html = response.data;
      }

      if (!html) {
        console.error(`Failed to retrieve data from ${source.name}`);
        continue;
      }

      const $ = cheerio.load(html);

      $("a:contains('funding')", html).each(function () {
        const title = $(this).text().trim();
        let url = $(this).attr("href") || "";
        if (url && !url.startsWith("http")) {
          url = source.base + url;
        }

        fundingData.push({
          title,
          url,
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
