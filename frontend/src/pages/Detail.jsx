import { useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import { useFetchWithAuth } from "../http";

const Detail = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { fetchWithAuth } = useFetchWithAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchWithAuth(`/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
          setError(null);
        } else {
          setError("Product not found");
        }
      } catch (error) {
        setError("Error fetching product data");
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {error && <div className="error">{error}</div>}{" "}
      <div className="grid">{product && <ProductItem product={product} />}</div>
    </div>
  );
};

export default Detail;
