# data_loader.py
import pandas as pd

def load_products(json_path="products.json"):
    """
    Specify a .json file to read and return the corresponding pandas dataframe.
    """
    df = pd.read_json(json_path)
    
    return df