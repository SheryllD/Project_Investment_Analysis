# Feature: Webscraper 

Created by: Sheryll Dumapal 
Date: 27-02-2025 

<br />

## About the webscraper 
This web scraper extracts investment and funding-related articles from multiple sources using Node.js, Express, Axios, and Cheerio.
<br />

### Prerequisites
Before running the scraper locally, ensure you have:

- Node.js installed
- Nodemon and Express installed
<br />

### Installation
If you haven't installed the necessary dependencies, run:

- npm install express axios cheerio

To install nodemon globally for easier development:
- npm install -g nodemon
<br />
### Usage
Starting the Application
To run the web scraper locally:
- npm start

## API Endpoints
Base URL: http://localhost:8000

#### 1. Get Welcome Message: 
GET /

Response:
"Welcome to the Investor & Funding Web Scraper API!"

#### 2. Get All Scraped Funding Articles: 
GET /funding

Response Example: 
[
  {
    "title": "Startup X Raises $10M in Series A",
    "url": "https://techfundingnews.com/startup-x-raises-10m",
    "source": "Funding News",
    "keyword": "funding rounds"
  }
]

#### 3. Get Articles from a Specific Funding Source
GET /funding/:fundingID

Example:

GET /funding/vcnewsdaily?keyword=AI

- fundingID: Name of the funding source (e.g., techfundingnews, vcnewsdaily)
- Optional Query Parameter (?keyword=): Filter by a keyword

Response Example: 
[
  {
    "title": "AI Startup Y Raises $15M",
    "url": "https://vcnewsdaily.com/ai-startup-y-raises-15m",
    "source": "vcnewsdaily",
    "keyword": "AI"
  }
]
<br/>

# Tech Stack 
- JavaScript (Node.js)
- Express.js (for API handling)
- Axios (for HTTP requests)
- Cheerio (for web scraping)
- Nodemon (for development)

# Features 


npm run start

</br>

# Technical Issues, Problems & Troubleshooting

## Trouble Shooting

#### 1. Missing express module error

If you get an error like:
Error: Cannot find module 'express'

#### 2. axios or cheerio missing
run in terminal:  npm install axios cheerio

#### 3. Permission Issues with ChromeDriver
If using ChromeDriver for headless browsing, ensure you have installed the correct version:
Download ChromeDriver: https://developer.chrome.com/docs/chromedriver/downloads

## Technical Issues, Problems: 
Most venture capital websites are difficult to scrape due to Cloudflare protection or dynamic content rendering. Initially, I attempted to bypass these restrictions by modifying the user agent to mimic human behavior. However, this approach was unsuccessful, and my requests were blocked.

Next, I tried using Selenium to handle dynamic pages, but this also failed to extract the required data effectively due to the complexity of the website’s structure and anti-bot mechanisms.