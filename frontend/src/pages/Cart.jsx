import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchWithAuth } from "../http";

const Cart = () => {
  const navigate = useNavigate();
 const { fetchWithAuth } = useFetchWithAuth();
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchWithAuth("http://localhost:5000/cart");
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products);
          setError(null);
        } else {
          setError("Failed to load cart items");
        }
      } catch (error) {
        setError("Error fetching cart data");
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [reload]);

  const handleDelete = async (id) => {
    try {
      const res = await fetchWithAuth(`http://localhost:5000/cart/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setReload(!reload);
        setError(null);
      } else {
        setError("Failed to delete product");
      }
    } catch (error) {
      setError("Error deleting product");
      console.error("Error submitting form:", error);
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchWithAuth("http://localhost:5000/orders", {
        method: "POST",
      });
      if (res.ok) {
        navigate("/");
        setError(null);
      } else {
        setError("Failed to place order");
      }
    } catch (error) {
      setError("Error placing order");
      console.error("Error ordering:", error);
    }
  };

  return (
    <>
      {error && <div className="error">{error}</div>}{" "}
      {products.length > 0 ? (
        <>
          <ul className="cart__item-list">
            {products.map((p, index) => (
              <li key={index} className="cart__item">
                <p>
                  {p.product.title} ({p.quantity})
                </p>
                <button
                  className="btn danger"
                  onClick={() => handleDelete(p._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="centered">
            <form onSubmit={handleOrder}>
              <button type="submit" className="btn">
                Order Now!
              </button>
            </form>
          </div>
        </>
      ) : (
        <h1>No Products in Cart!</h1>
      )}
    </>
  );
};

export default Cart;
