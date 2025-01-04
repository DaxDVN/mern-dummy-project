import { useEffect, useState } from "react";
import { useFetchWithAuth } from "../http";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [reload, setReload] = useState(true);
  const [error, setError] = useState(null);
  const { fetchWithAuth } = useFetchWithAuth();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetchWithAuth("/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
          setError(null);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (error) {
        setError("Error fetching orders");
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [reload]);

  return (
    <>
      {error && <div className="error">{error}</div>}{" "}
      {orders.length <= 0 ? (
        <h1>Nothing there!</h1>
      ) : (
        <ul className="orders">
          {orders.map((order, index) => (
            <li key={index} className="orders__item">
              <h1>Order - # {order._id}</h1>
              <ul className="orders__products">
                {order.items.map((item, index) => (
                  <li key={index} className="orders__products-item">
                    {item.product.title} ({item.quantity ?? "N/A"}){" "}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Order;
