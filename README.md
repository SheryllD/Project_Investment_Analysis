# Project: Startup Investments & Fundings  

**Created by:**  
- Michele  
- Sheryll Dumapal  

**Date:** 27-02-2025  

---

## **Branches Created**  
- **Main/Master**: Data Analysis  
- **Cleaning**: Data Cleaning  
- **Feature**: Web Scraper Development  

---

## **Business Case**  
Understanding startup investments and funding trends to identify high-growth industries and profitable investment opportunities.  

---

## **Problems**  
1. Investors struggle to identify fast-growing industries.  
2. Difficulties in comparing industries for the highest profit potential.  

---

## **Hypothesis**  
1. Technology sectors such as AI, e-commerce, and renewable energy will outpace traditional industries in growth, driven by continuous innovation and continuous market demand.

2. Due to scalable business models and digital efficiencies, emerging technology sectors are expected to deliver higher profit margins than conventional industries.

3. Countries with strong innovation ecosystems and favorable regulations, particularly the United States, will attract the largest volumes of investor capital, further boosting emerging tech sectors.

4. The United States is the leading country in startup investments and funding for emerging ventures.

---

## **Methodology**  

### **1. Data Cleaning & Preprocessing**  
- Loaded and reviewed dataset structure.  
- Removed duplicates and handled missing values.  
- Standardised formats and converted categorical values for analysis.  

### **2. Exploratory Data Analysis (EDA)**  
- Identified top industries and countries by investment and valuation.  
- Segmented industries based on investment and growth.  

### **3. Data Visualisation**  
- Created bar charts, pie charts, and segmentation visualisations to illustrate investment trends and growth patterns.  

---

## **Key Findings**  
- **Top Country for Investment:** Australia  
- **Highest Growth Rate:** EdTech  
- **Highest Valuation Industry:** E-commerce  
- **Most Investment but Least Growth:** Health Tech  

---

## **Key Takeaways**  
- **Australia** is a major player in startup investments.  
- **EdTech** shows promising growth potential.  
- **Health Tech** is overfunded with slow growth, signaling saturation.  

---

## **Business Implications**  
- Investors should focus on high-growth industries like **EdTech**.  
- Overfunded industries (e.g., **Health Tech**) may offer lower returns.  
- **Australia** presents strong opportunities for startup investments.  

---

## **Technical Challenges**  
- Difficulty formatting currency values (M/B notation) while maintaining numerical operations.  
- Startup names converted to unique **IDs** for easier indexing.  
<br/>

---

## Functions

- data cleaning functions: Regex, Args, Loops, index, DF
- data aggreagation functions: for loops, index, Args, Sum, Average
- Visualitations functions: Args, Import matplot.pyplot, plt figure, plt pie, plt tittle, plt show
<br/>

---

## Conclusion & Insights
Summary of Findings
- Top investing country: Australia has the highest total investment in startups, indicating strong investor confidence and funding activity.
- Most invested industry: Health Tech receives the most funding, suggesting high investor interest, but growth potential may be limited due to market saturation.
- Highest growth rate: EdTech shows the fastest growth, highlighting emerging opportunities in education technology and digital learning solutions.
- Industry with highest valuation: E-commerce has the highest overall valuation, reflecting its profitability and dominance in the startup ecosystem.
- Country with highest valuation: Australia leads in startup valuations, reinforcing its position as a key player in global startup investments.
- Investment distribution: Investments are fairly evenly spread across industries and countries, indicating a diversified funding landscape rather than a strong concentration in specific sectors.
<br/>

---

## Key takeaways relevant to the problem statements

- show that Australia is the countries which invested more 
- Industry with highest growth and growth potential: Australia
- show the industry with more invesment and least growth: Health Tech 
<br/>

---

## Next steps

- As invesment advisors we direct private investor into the most profitable oportunities in private equity
- in this case EdTech shows a good potential and Health tech shows the slowest growth thats a sign of a overheated and overfunded industry. 
- Showwing which countries harvest the greatest oportunity to do business in our data Australia is at the top
<br/>

---

## Technical Issues & Problems 

- we tried to use a format for the money amounts having it show a M or B (millions and billions) for a better user experience but it didnt work for getting statistics as we needed am integer and not a string 
- we change the startups generic names into an Id numbers for better searchability
<br/>
<br/>
<br/> 

---

# Feature: Webscraper 

Created by: Sheryll Dumapal    
 
<br />

## About the webscraper 
This web scraper extracts investment and funding-related articles from multiple sources using Node.js, Express, Axios, and Cheerio.
<br />
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

### API Endpoints
Base URL: http://localhost:8000
<br /> 
</br>

#### 1. Get Welcome Message: 
GET /
</br>

Response:
"Welcome to the Investor & Funding Web Scraper API!"
</br> 
</br>

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
</br> 

#### 3. Get Articles from a Specific Funding Source
GET /funding/:fundingID

Example:

GET /funding/vcnewsdaily?keyword=AI

- fundingID: Name of the funding source (e.g., techfundingnews, vcnewsdaily)
- Optional Query Parameter (?keyword=): Filter by a keyword

</br>

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

---

# Tech Stack 
- JavaScript (Node.js)
- Express.js (for API handling)
- Axios (for HTTP requests)
- Cheerio (for web scraping)
- Nodemon (for development)

---

# Features 

### 1. Multi-Source Scraping
Collects articles from multiple venture capital and startup funding news websites.
Supports static and dynamic webpages (with limitations on Cloudflare-protected sites).
</br>

### 2. Keyword-Based Filtering
Extracts only relevant articles by matching predefined investment-related keywords such as:
- "startup"  
- "investment"  
- "funding rounds"  
- "AI"  
- "private equity insights"   
This ensures that only the most relevant funding news is captured.
</br>

### 3. REST API for Accessing Scraped Data
Provides structured JSON responses via an API.  

Endpoints available:  
- GET /funding → Fetch all scraped funding articles.  
- GET /funding/:fundingID → Retrieve articles from a specific funding source.  
Optional query parameters allow filtering by keywords.  
</br> 

### 4. Automatic Refresh (Scheduled Scraping)
- The scraper automatically refreshes every 30 minutes using setInterval().  
- Ensures the data remains up-to-date without manual intervention.  
</br> 

### 5. Handles URL Formatting & Missing Links
- Automatically fixes incomplete or relative URLs, ensuring all links are accessible.  
- Prevents broken links by appending missing base URLs from each funding source.  
</br> 

### 6. Error Handling & Logging
- Catches and logs errors if a website fails to load or blocks scraping attempts.  
 
- Prevents API failures by gracefully skipping problematic sources.  
</br> 

### 7. Lightweight & Fast
- Uses Axios and Cheerio for fast, efficient HTML parsing.  

- Avoids excessive load on websites by making minimal requests.  
</br>
---

# Technical Issues, Problems & Troubleshooting

## Trouble Shooting

#### 1. Missing express module error

If you get an error like:  

Error: Cannot find module 'express'
- install express
</br>

#### 2. axios or cheerio missing
run in terminal:  npm install axios cheerio
</br>

#### 3. Permission Issues with ChromeDriver
If using ChromeDriver for headless browsing, ensure you have installed the correct version:
Download ChromeDriver: https://developer.chrome.com/docs/chromedriver/downloads
</br>

## Technical Issues, Problems: 
Most venture capital websites are difficult to scrape due to Cloudflare protection or dynamic content rendering. Initially, I attempted to bypass these restrictions by modifying the user agent to mimic human behavior. However, this approach was unsuccessful, and my requests were blocked.

Next, I tried using Selenium to handle dynamic pages, but this also failed to extract the required data effectively due to the complexity of the website’s structure and anti-bot mechanisms.

