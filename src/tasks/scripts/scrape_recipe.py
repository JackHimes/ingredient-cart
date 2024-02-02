import sys 
from recipe_scrapers import scrape_me
import json

scraper = scrape_me(sys.argv[1])

result = {"ingredients": scraper.ingredients()}
print(json.dumps(result))