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
<br />

## API Endpoints
Base URL: http://localhost:8000
<br /> 

#### 1. Get Welcome Message: 
GET /

Response:
"Welcome to the Investor & Funding Web Scraper API!"

#### 2. Get All Scraped Funding Articles: 
GET /funding
<br/>

Response Example:
```json
[
  {
    "title": "Startup X Raises $10M in Series A",
    "url": "https://techfundingnews.com/startup-x-raises-10m",
    "source": "Funding News",
    "keyword": "funding rounds"
  }
]
```

#### 3. Get Articles from a Specific Funding Source
GET /funding/:fundingID

Example:

GET /funding/vcnewsdaily?keyword=AI

- fundingID: Name of the funding source (e.g., techfundingnews, vcnewsdaily)
- Optional Query Parameter (?keyword=): Filter by a keyword

Response Example: 
```json
[
  {
    "title": "AI Startup Y Raises $15M",
    "url": "https://vcnewsdaily.com/ai-startup-y-raises-15m",
    "source": "vcnewsdaily",
    "keyword": "AI"
  }
]
```
<br/>

# Tech Stack 
- JavaScript (Node.js)
- Express.js (for API handling)
- Axios (for HTTP requests)
- Cheerio (for web scraping)
- Nodemon (for development)

# Features 

### 1. Multi-Source Scraping
Collects articles from multiple venture capital and startup funding news websites.
Supports static and dynamic webpages (with limitations on Cloudflare-protected sites).
</br>

### 2. Keyword-Based Filtering
Extracts only relevant articles by matching predefined investment-related keywords such as:
"startup"  
"investment"  
"funding rounds"  
"AI"  
"private equity insights"   
This ensures that only the most relevant funding news is captured.
</br>

### 3. REST API for Accessing Scraped Data
Provides structured JSON responses via an API.  

Endpoints available:  
GET /funding → Fetch all scraped funding articles.  
GET /funding/:fundingID → Retrieve articles from a specific funding source.  
Optional query parameters allow filtering by keywords.  
</br> 

### 4. Automatic Refresh (Scheduled Scraping)
The scraper automatically refreshes every 30 minutes using setInterval().  
Ensures the data remains up-to-date without manual intervention.  
</br> 

### 5. Handles URL Formatting & Missing Links
Automatically fixes incomplete or relative URLs, ensuring all links are accessible.  
Prevents broken links by appending missing base URLs from each funding source.  
</br> 

### 6. Error Handling & Logging
Catches and logs errors if a website fails to load or blocks scraping attempts.  
Prevents API failures by gracefully skipping problematic sources.  
</br> 

### 7. Lightweight & Fast
Uses Axios and Cheerio for fast, efficient HTML parsing.  
Avoids excessive load on websites by making minimal requests.  
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