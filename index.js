const PORT = process.env.PORT || 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const fundingSources = [
  {
    name: "Funding News",
    address: "https://techfundingnews.com/category/funding/",
    base: "https://techfundingnews.com",
  },
  {
    name: "Venture Capital Journal",
    address:
      "https://www.venturecapitaljournal.com/news-and-analysis/firms-funds/",
    base: "https://www.venturecapitaljournal.com",
  },
  {
    name: "vcnewsdaily",
    address: "https://vcnewsdaily.com/",
    base: "https://vcnewsdaily.com/",
  },
  {
    name: "cnbc",
    address: "https://www.cnbc.com/venture-capital/",
    base: "https://techfundingnews.com",
  },
  {
    name: "Google News",
    address:
      "https://www.google.com/search?q=startups+funding&sca_esv=6acdd3b722376336&biw=1210&bih=925&tbm=nws&sxsrf=AHTn8zobDYNN6g_2AcpMkYRJpKpTvnemXg%3A1740685152242&ei=YL_AZ4e8Dp6I9u8PzfykiQo&ved=0ahUKEwiH7KjBzeSLAxUehP0HHU0-KaEQ4dUDCA4&uact=5&oq=startups+funding&gs_lp=Egxnd3Mtd2l6LW5ld3MiEHN0YXJ0dXBzIGZ1bmRpbmcyBxAAGIAEGAoyBxAAGIAEGAoyBxAAGIAEGAoyBxAAGIAEGAoyBxAAGIAEGAoyBRAAGIAEMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKMgcQABiABBgKSJEVUABYpRJwAXgAkAEAmAHMAqABgRaqAQczLjkuMS4zuAEDyAEA-AEBmAIQoALMFqgCAMICCxAAGIAEGJECGIoFwgIKEAAYgAQYQxiKBcICCxAAGIAEGIYDGIoFmAMBkgcIMi4xMC4xLjOgB8lg&sclient=gws-wiz-news",
    base: "https://techfundingnews.com",
  },
];

const keywords = [
  "climate",
  "startup",
  "investment",
  "funding rounds",
  "technology",
  "Startup investments",
  "Private equity insights",
  "AI",
  "funded_organization",
]; 
let articles = []; // Storing the scraped articles

// Function to scrape articles from all funding sources
const scrapeArticles = async () => {
  articles = []; // Resetting articles before scraping

  for (const source of fundingSources) {
    try {
      const response = await axios.get(source.address);
      const html = response.data;
      const $ = cheerio.load(html);

      keywords.forEach((keyword) => {
        $(`a:contains("${keyword}")`, html).each(function () {
          const title = $(this).text().trim();
          let url = $(this).attr("href") || "";

          if (url && !url.startsWith("http")) {
            url = source.base + url;
          }

          articles.push({
            title,
            url,
            source: source.name,
            keyword, // Tracking the keyword match
          });
        });
      });
    } catch (error) {
      console.error(`Error scraping ${source.name}:`, error.message);
    }
  }
};

// Initial scraping on startups
scrapeArticles();

// Scheduling the scraping every 30 minutes
setInterval(scrapeArticles, 30 * 60 * 1000);

// Homepage Route
app.get("/", (req, res) => {
  res.json("Welcome to the Investor & Funding Web Scraper API!");
});

// Route to get all scraped funding articles
app.get("/funding", (req, res) => {
  res.json(articles);
});

// Route to get articles for specific funding source, with optional keyword filtering
app.get("/funding/:fundingID", (req, res) => {
  const fundingID = req.params.fundingID.toLowerCase();
  const keywordQuery = req.query.keyword?.toLowerCase();

  const source = fundingSources.find((s) => s.name.toLowerCase() === fundingID);

  if (!source) {
    return res.status(404).json({ error: "Funding source not found!" });
  }

  const filteredArticles = articles.filter(
    (article) =>
      article.source.toLowerCase() === fundingID &&
      (!keywordQuery || article.keyword.toLowerCase() === keywordQuery)
  );

  res.json(
    filteredArticles.length > 0
      ? filteredArticles
      : { message: "No articles found for this source." }
  );
});

// Starting the server
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
