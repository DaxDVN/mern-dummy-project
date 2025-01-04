import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import { portURL } from "../http";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(portURL + "/products")
      .then((res) => {
        if (!res.ok) {
          setError("Failed to load products");
          throw new Error("Failed to load products");
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => {
        setError("Error fetching products");
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      {error && <div className="error">{error}</div>}{" "}
      <div className="grid">
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))
        ) : (
          <h1>No Products Found!</h1>
        )}
      </div>
    </div>
  );
};

export default Shop;
