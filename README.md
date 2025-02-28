# Project: Startup Investments & Fundings 

Created by: 
- Michele  
- Sheryll Dumapal  

Date: 27-02-2025
<br/>

Branches created:  
- Branch: Main/Master (Data Analysis)
- Branch: cleaning (for cleaning the data)
- Branch: feature (for creating the webscraper)
<br/>

## Business Case
- explanation here 

## Problems: 

1. Investors, Big Fundings & Banks often struggle to identify which industries are growing the fastest, making it hard to target areas with rapid market expansion. <br/>

2. Without clear comparisons, it is difficult for investors to determine which industries offer the highest profit margins. 
<br/>

## Hypothesis: 

1. Technology sectors such as AI, e-commerce, and renewable energy will outpace traditional industries in growth, driven by continuous innovation and continuous market demand.
<br/>

2. Due to scalable business models and digital efficiencies, emerging technology sectors are expected to deliver higher profit margins than conventional industries.
<br/>

3. Countries with strong innovation ecosystems and favorable regulations, particularly the United States, will attract the largest volumes of investor capital, further boosting emerging tech sectors.
<br/>

4. The United States is the leading country in startup investments and funding for emerging ventures.
<br/>

## Mythodology: 

<br/>

#### 1. Loading & Data Cleaning 
1. We began by reviewing and cleaning the dataset to understand its structure and key patterns.  
2. We imported the necessary libraries for data cleaning and analysis.  
3. We loaded the CSV dataset and used `df.shape` to examine the number of rows and columns.  
4. We checked for duplicate rows using `df.duplicated().sum()`.  
5. We generated summary statistics with `df.describe()` and `df.describe(include="all")` to gain insights into numerical and categorical data.  
6. We reviewed the dataset’s structure, data types, and non-null counts using `df.info()`.  

<br/>

#### 2. Preprocessing 
<br/>

 ##### Handling missing values 
7. We identified missing values in each column using `df.isnull().sum()`.  
8. If missing values were present, we decided on an appropriate handling method based on the data type and context.  
9. If missing values were minimal, we opted to drop them using `df.dropna(inplace=True)`.  
10. If missing values were significant, we filled them:  
   - **For numerical data**: We used `df.fillna(df.mean())` to replace missing values with the column mean.  
   - **For categorical data**: We replaced missing values with `"Unknown"` using `df.fillna("Unknown")`.  
11. For time-series data, we used `df.interpolate()` to estimate missing values based on existing trends.  
<br/>

 ##### Removing duplicates and inconsistencies
12. We identified duplicate rows using `df.duplicated().sum()`.  
13. If duplicates were found, we removed them using `df.drop_duplicates(inplace=True)`.  
<br/>

 ##### Data Cleaning & Transformation
14. We renamed the `"Startup Name"` column to `"Startup ID"` for better indexing.  
15. We converted startup names into unique numeric IDs using:  
    ```python
    df["Startup ID"] = df["Startup ID"].factorize()[0] + 1
    ```
16. We rounded all numerical columns to two decimal places using:  
    ```python
    df = df.round(2)
    ```
17. We saved the cleaned dataset as a new CSV file for further analysis:  
    ```python
    df.to_csv("data_files/cleaned_startup_data.csv", index=False)
    ```
<br/>

##### 3. Exploratory Data Analysis (EDA)

18. We calculated the average growth rate for each industry by grouping data using:  
    ```python
    growth_by_industry = df.groupby("Industry")["Growth Rate (%)"].mean().reset_index()
    ```  
19. We identified the industry with the highest growth rate.  
20. We calculated total investment and valuation by industry:  
    ```python
    industry_stats = df.groupby("Industry").agg(
        Total_Investment=("Investment Amount (USD)", "sum"),
        Total_Valuation=("Valuation (USD)", "sum")
    ).reset_index()
    ```
21. We determined the industry with the most investment and highest valuation.  
22. We calculated total investment by country to identify which country invested the most.  

##### Data Segmentation
23. We segmented industries based on investment size using quantile-based grouping (`qcut`):  
    ```python
    industry_stats["Investment_Segment"] = pd.qcut(
        industry_stats["Total_Investment"], q=3, labels=["Low", "Medium", "High"]
    )
    ```
24. We applied the same segmentation method to valuation data and country statistics:  
    ```python
    country_stats["Investment_Segment"] = pd.qcut(
        country_stats["Total_Investment"], q=3, labels=["Low", "Medium", "High"]
    )
    ```
##### **Saving Data for Future Use**  
25. We saved the cleaned dataset as a Pickle file for quick access in later analysis:  
    ```python
    df.to_pickle("data_files/investment_data.pkl")
    ```
26. We reloaded the Pickle file to verify data integrity:  
    ```python
    df_loaded = pd.read_pickle("data_files/investment_data.pkl")
    ```
##### **Data Visualization**  
27. We created visual representations of the dataset, including:  
   - **Industry-wise Investment Segmentation** using bar plots.  
   - **Country-wise Investment Segmentation** to compare total investments.  
   - **Industry-wise Valuation Segmentation** to assess total valuation.  
   - **Country-wise Valuation Segmentation** to understand investment distribution.  
28. We visualized average growth rates for each industry using bar charts:  
    ```python
    industry_growth = df.groupby("Industry")["Growth Rate"].mean().sort_values(ascending=False)
    sns.barplot(x=industry_growth.values, y=industry_growth.index, palette="coolwarm")
    ```
29. We generated pie charts to display total investment and valuation distribution across industries and countries:  
    ```python
    plt.pie(industry_totals["Total_Investment"], labels=industry_totals.index, autopct='%1.1f%%')
    plt.pie(country_totals["Total_Investment"], labels=country_totals.index, autopct='%1.1f%%')
    ```
30. We saved all visual outputs as image files in the `data_visuals` directory:  
    ```python
    plt.savefig("data_visuals/investment_valuation_segmentation.png", bbox_inches="tight")
    ```

<br/>

## Functions

- data cleaning functions: Regex, Args, Loops, index, DF
- data aggreagation functions: for loops, index, Args, Sum, Average
- Visualitations functions: Args, Import matplot.pyplot, plt figure, plt pie, plt tittle, plt show
<br/>

## Conclusion & Insights
Summary of findings: 

- segmentation of amount invested by countries: Australia  

- segmentation of amount invested by industry: Heatlh Tech  

- Average growth rate:  EdTech  

- industry highest valuation: E-commerce  

- country highest valuation: Australia  

- Fairly even distribtion of invesment amoung  all countries and industries  
<br/>

## Key takeaways relevant to the problem statements

- show that Australia is the countries which invested more 
- Industry with highest growth and growth potential: Australia
- show the industry with more invesment and least growth: Health Tech 
<br/>

## Potential business implications or next steps

- As invesment advisors we direct private investor into the most profitable oportunities in private equity
- in this case EdTech shows a good potential and Health tech shows the slowest growth thats a sign of a overheated and overfunded industry. 
- Showwing which countries harvest the greatest oportunity to do business in our data Australia is at the top
<br/>

## Technical Issues & Problems 

- we tried to use a format for the money amounts having it show a M or B (millions and billions) for a better user experience but it didnt work for getting statistics as we needed am integer and not a string 
- we change the startups generic names into an Id numbers for better searchability
<br/>
<br/>
<br/> 

# Feature: Webscraper 

Created by: Sheryll Dumapal    
 
<br />

## About the webscraper 
This web scraper extracts investment and funding-related articles from multiple sources using Node.js, Express, Axios, and Cheerio.
<br />
</br>

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

