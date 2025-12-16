import { useEffect, useState } from "react";
import { getFilteredProducts } from "../../../utils/productApi";
import "./ProductSearchModal.css";

const apiCategoryMap = {
  Travel: "Travel",
  Home: "Home",
  "Home & Kitchen": "Home",
  Automotive: "Automotive",
  "Pet Supplies": "Pet Supplies",
  "Smart Devices": "Electronics",
  "Sports & Outdoors": "Sports",

  Clothing: "Clothing",
  "Smart Home": "Electronics",
  Baby: "Baby",
  Beauty: "Beauty",
  "Party Supplies": "Party Supplies",
  Education: "Education",
  "Gift Cards": "Gift Cards",

  // These came directly from your backend
  "Men's Clothing": "Clothing",
  "Women's Clothing": "Clothing",
  Electronics: "Electronics",
  "Home Appliances": "Home",
  "Beauty & Personal Care": "Beauty",
  Toys: "Toys",
  Sports: "Sports",
};

export default function ProductSearchModal({ open, onClose, interests = [] }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // filters inside modal
  const [productType, setProductType] = useState("Clothing");
  const [minPrice, setMinPrice] = useState("5");
  const [maxPrice, setMaxPrice] = useState("25");

  // load products when modal first opens
  useEffect(() => {
    if (!open) return;
    fetchProducts(true);
  }, [open]);
  useEffect(() => {
    if (!open || !interests || interests.length === 0) return;

    // Pick the first selected interest
    const firstInterest = interests[0];

    // Map UI → API category
    const mappedCategory = apiCategoryMap[firstInterest] || firstInterest;

    setProductType(mappedCategory);
  }, [open, interests]);

  async function fetchProducts(reset = true) {
    setLoading(true);
    try {
      const offset = reset ? 0 : products.length;

      const mappedCategory = apiCategoryMap[productType] || productType;

      const data = await getFilteredProducts({
        product_type: mappedCategory,
        min_price: minPrice,
        max_price: maxPrice,
        limit: 20,
        offset,
      });

      setTotal(data.total || 0);

      if (reset) {
        setProducts(data.results || []);
      } else {
        setProducts((prev) => [...prev, ...(data.results || [])]);
      }
    } catch (err) {
      console.error("Product fetch error:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    fetchProducts(true);
  }

  if (!open) return null;

  return (
    <div className="modal-product-overlay">
      <div className="product-modal">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <h2 className="modal-title">Gift Ideas</h2>

        <form className="product-filters" onSubmit={handleSearch}>
          <div className="product-filter-field">
            <label>Category</label>

            <select
              value={productType}
              onChange={(e) => {
                const uiCategory = e.target.value;
                const apiCategory = apiCategoryMap[uiCategory] || uiCategory;
                setProductType(apiCategory);
              }}
            >
              <option value="Travel">Travel</option>
              <option value="Home">Home</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Automotive">Automotive</option>
              <option value="Pet Supplies">Pet Supplies</option>
              <option value="Smart Devices">Smart Devices</option>
              <option value="Sports & Outdoors">Sports & Outdoors</option>

              <option value="Clothing">Clothing</option>
              <option value="Smart Home">Smart Home</option>
              <option value="Baby">Baby</option>
              <option value="Beauty">Beauty</option>
              <option value="Party Supplies">Party Supplies</option>
              <option value="Education">Education</option>
              <option value="Gift Cards">Gift Cards</option>

              <option value="Electronics">Electronics</option>
              <option value="Home Appliances">Home Appliances</option>
              <option value="Industrial">Industrial</option>
              <option value="Arts & Crafts">Arts & Crafts</option>
              <option value="Health">Health</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

          <div className="product-filter-row">
            <div className="product-filter-field">
              <label>Min price</label>
              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div className="product-filter-field">
              <label>Max price</label>
              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          <button className="search-btn" type="submit" disabled={loading}>
            {loading && products.length === 0 ? "Searching…" : "Search"}
          </button>
        </form>

        {total > 0 && (
          <p className="product-total">
            Showing {products.length} of {total} results
          </p>
        )}

        {loading && products.length === 0 && <p>Loading…</p>}

        <div className="modal-products-grid">
          {products.map((p) => (
            <div className="product-card" key={p.asin}>
              {p.imgUrl && <img src={p.imgUrl} alt={p.title} />}
              <h4>{p.title}</h4>
              <p className="price">💲{p.price}</p>
              <p className="category">{p.category_name}</p>
              <a
                href={p.productURL}
                target="_blank"
                rel="noopener noreferrer"
                className="buy-btn"
              >
                View Product
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
