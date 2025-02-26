const express = require("express");
const puppeteer = require("puppeteer-extra");
const cors = require("cors");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const sources = [
  {
    name: "crunchbase",
    address: "https://www.crunchbase.com",
  },
  {
    name: "techcrunch",
    address: "https://techcrunch.com",
  },
  {
    name: "cbinsights",
    address: "https://www.cbinsights.com",
  },
  {
    name: "pitchbook",
    address: "https://pitchbook.com/news",
  },
  {
    name: "startup-map-berlin",
    address: "https://startup-map.berlin/transactions.rounds",
  },
];

async function scrapeFundingData() {
  const browser = await puppeteer.launch({
    headless: true, // Set to true for production
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  const fundingData = [];

  for (const source of sources) {
    try {
      console.log(`Scraping ${source.name}...`);
      await page.goto(source.address, {
        waitUntil: "domcontentloaded",
        timeout: 60000,
      });

      // Corrected wait method, if it doesnt work (alternative to page.waitForTimeout)
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Extracting page HTML to check if content is loaded.
      const html = await page.content();

      // Extracting funding data from the table
      const scrapedData = await page.evaluate(() => {
        const rows = Array.from(
          document.querySelectorAll(".igc-table.__dynamic tbody tr")
        );
        return rows.map((row) => {
          const columns = row.querySelectorAll("td");
          return {
            company: columns[0]?.innerText.trim() || "N/A",
            amount: columns[1]?.innerText.trim() || "N/A",
            leadInvestors: columns[2]?.innerText.trim() || "N/A",
            valuation: columns[3]?.innerText.trim() || "N/A",
            industry: columns[4]?.innerText.trim() || "N/A",
            dateReported: columns[5]?.innerText.trim() || "N/A",
          };
        });
      });

      fundingData.push(...scrapedData);
    } catch (error) {
      console.log(`Error with scraping ${source.name}: ${error.message}`);
    }
  }

  await browser.close();
  return fundingData;
}

app.get("/funding", async (req, res) => {
  console.log("API Request: /funding");
  const data = await scrapeFundingData();
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
