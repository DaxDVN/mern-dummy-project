import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import { portURL } from "../http";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [toggleFetch, setToggleFetch] = useState(false);
  useEffect(() => {
    fetch(portURL + "/admin/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [toggleFetch]);

  const handleToggle = () => {
    setToggleFetch(!toggleFetch);
  };
  return (
    <div>
      <div className="grid">
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductItem
              key={index}
              product={product}
              handleToggle={handleToggle}
            />
          ))
        ) : (
          <h1>No Products Found!</h1>
        )}
      </div>
    </div>
  );
};

export default Products;
