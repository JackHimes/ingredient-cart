import sys
import json
from recipe_scrapers import scrape_me

def fetch_data(url):
    """Fetch data using the scraper."""
    scraper = scrape_me(url)
    return scraper

def process_data(scraper):
    """Convert the scraped data to JSON format."""
    return scraper.to_json()

def main(url):
    """Main function to fetch and process data."""
    scraper = fetch_data(url)
    result = process_data(scraper)
    print(json.dumps(result))

if __name__ == '__main__':
    if len(sys.argv) > 1:
        main(sys.argv[1])
    else:
        print("Please provide a URL as an argument.")
