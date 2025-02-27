# Feature: Webscraper 

## About the webscraper 
This web scraper extracts investment and funding-related articles from multiple sources using Node.js, Express, Axios, and Cheerio.

### Prerequisites
Before running the scraper locally, ensure you have:

- Node.js installed
- Nodemon and Express installed

### Installation
If you haven't installed the necessary dependencies, run:

- npm install express axios cheerio

To install nodemon globally for easier development:
npm install -g nodemon

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

# API Information

# Tech used: 
- Javascript 


# Features 


npm run start

# Technical Issues & Problems 


To use:

https://storage.googleapis.com/chrome-for-testing-public/133.0.6943.141/mac-x64/chromedriver-mac-x64.zip
