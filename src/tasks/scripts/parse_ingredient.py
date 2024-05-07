import sys
import spacy
import json

# Load the English tokenizer, tagger, parser, and entity recognizer
nlp = spacy.load("en_core_web_sm")

def parse_ingredient_string(ingredient_string):
    # Process the ingredient string using SpaCy
    doc = nlp(ingredient_string)
    
    # Extract quantity and ingredient information
    quantity = None
    ingredient = None
    for token in doc:
        if token.pos_ == "NUM":
            quantity = token.text
        elif token.pos_ == "NOUN":
            ingredient = token.text
            break  # Stop at the first noun encountered
    
    # Create a dictionary to store the extracted information
    result = {"quantity": quantity, "ingredient": ingredient}
    return result

if __name__ == "__main__":
    ingredient_string = sys.argv[1]
    result = parse_ingredient_string(ingredient_string)
    print(json.dumps(result))
