import sys 
from recipe_scrapers import scrape_me

scraper = scrape_me(sys.argv[1])

print({"ingredients": scraper.ingredients()})