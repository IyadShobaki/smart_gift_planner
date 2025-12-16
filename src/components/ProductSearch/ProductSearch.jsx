// src/components/ProductSearch/ProductSearch.jsx
import { useState } from "react";
import { getFilteredProducts } from "../../utils/productApi";
import "./ProductSearch.css";

export default function ProductSearch() {
  const [productType, setProductType] = useState("Clothing");
  const [minPrice, setMinPrice] = useState("5");
  const [maxPrice, setMaxPrice] = useState("20");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setProducts([]);

    try {
      const data = await getFilteredProducts({
        product_type:  apiCategoryMap[productType] || productType,
        min_price: minPrice,
        max_price: maxPrice,
        limit: 5,
        offset: 0,
      });

      setTotal(data.total || 0);
      setProducts(data.results || []);
    } catch (err) {
      console.error("Product search error:", err);
      setError("Could not load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="product-search">
      <h3 className="product-search__title">Find Gift Ideas</h3>

      <form className="product-search__form" onSubmit={handleSearch}>
        <div className="product-search__field">
          <label>Category</label>
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
          >
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Toys">Toys</option>
            <option value="Beauty">Beauty</option>
            <option value="Home">Home</option>
          </select>
        </div>

        <div className="product-search__field product-search__field--inline">
          <div>
            <label>Min Price</label>
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div>
            <label>Max Price</label>
            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <button className="product-search__btn" type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search Products"}
        </button>
      </form>

      {error && <p className="product-search__error">{error}</p>}

      {total > 0 && (
        <p className="product-search__count">
          Showing {products.length} of {total} results
        </p>
      )}

      {products.length > 0 && (
        <div className="product-search__results">
          {products.map((item) => (
            <div key={item.asin} className="product-card">
              <h4 className="product-card__name">{item.title}</h4>

              {item.imgUrl && (
                <img
                  src={item.imgUrl}
                  alt={item.title}
                  className="product-card__image"
                />
              )}

              <p className="product-card__price">
                ${item.price?.toFixed ? item.price.toFixed(2) : item.price}
              </p>

              <p className="product-card__meta">
                ⭐ {item.stars} · {item.category_name}
              </p>

              <a
                href={item.productURL}
                target="_blank"
                rel="noreferrer"
                className="product-card__link"
              >
                View on Amazon
              </a>
            </div>
          ))}
        </div>
      )}

      {!loading && products.length === 0 && total === 0 && !error && (
        <p className="product-search__empty">
          Use the filters above and click <strong>Search Products</strong> to see suggestions.
        </p>
      )}
    </div>
  );
}
