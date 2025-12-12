# main.py
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from data_loader import load_products
from ds_functions import categorize_products, filter_products

app = FastAPI(title="Smart Gift Planner")

# Enable CORS so your React frontend can fetch data
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with your frontend domain in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load products at startup
df_products = load_products("products.json")
df_products = categorize_products(df_products)

@app.get("/products")
def get_products(
    product_type: str = Query(None, description="Filter by product type"),
    min_price: float = Query(None, description="Minimum price"),
    max_price: float = Query(None, description="Maximum price"),
    limit: int = Query(100, description="Number of products to return"),
    offset: int = Query(0, description="Pagination offset"),
):
    """
    Get filtered products.
    """
    filtered = filter_products(df_products, product_type, min_price, max_price)
    paginated = filtered.iloc[offset:offset+limit]

    return paginated.to_dict(orient="records")
