import unittest
from unittest.mock import patch, MagicMock
from src.tasks.scripts.scrape_recipe import fetch_data, process_data, main

class TestScrapeRecipe(unittest.TestCase):
    @patch('src.tasks.scripts.scrape_recipe.scrape_me')
    def test_fetch_data(self, mock_scrape):
        # Set up the mock to simulate `scrape_me` functionality
        test_url = "http://example.com/recipe"
        fetch_data(test_url)
        mock_scrape.assert_called_with(test_url)  # Assert that scrape_me was called correctly

    @patch('src.tasks.scripts.scrape_recipe.scrape_me')
    def test_process_data(self, mock_scrape):
    # Create a mock object that has a `to_json()` method
        scraper_mock = MagicMock()
        scraper_mock.to_json.return_value = {"title": "Test Recipe", "ingredients": ["1 cup sugar", "2 cups flour"]}
        
        # Set the mock to return our mock object when called
        mock_scrape.return_value = scraper_mock
        
        result = process_data(scraper_mock)
        self.assertEqual(result, {"title": "Test Recipe", "ingredients": ["1 cup sugar", "2 cups flour"]})

    @patch('src.tasks.scripts.scrape_recipe.scrape_me')
    def test_main(self, mock_scrape):
        # Full test of the main function, simulating command line input
        mock_scrape.return_value.to_json.return_value = {"ingredients": ["1 cup sugar"]}
        with patch('sys.argv', ['script_name', 'http://example.com/recipe']):
            with patch('builtins.print') as mock_print:
                main("http://example.com/recipe")
                mock_print.assert_called_with('{"ingredients": ["1 cup sugar"]}')  # Check output format

if __name__ == '__main__':
    unittest.main()