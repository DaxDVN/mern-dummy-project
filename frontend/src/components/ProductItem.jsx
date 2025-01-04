import { useNavigate, useLocation } from "react-router-dom";
import { useFetchWithAuth } from "../http";

const ProductItem = ({ product, handleToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
 const { fetchWithAuth } = useFetchWithAuth();
  const addToCart = async () => {
    const cartItem = {
      _id: product[`_id`],
      productPrice: product[`price`],
    };
    try {
      const res = await fetchWithAuth("http://localhost:5000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });

      if (res.ok) {
        alert("Successfully added to cart");
      } else {
        const errorData = await res.json();
        alert(`Please login`);
      }
    } catch (error) {
      alert(`Error: ${error.message || "An unexpected error occurred"}`);
    }
  };

  const navigateToEdit = () => {
    navigate(`/admin/edit-product/${product[`_id`]}`);
  };

  const navigateToDetail = () => {
    navigate(`/product/${product[`_id`]}`);
  };

  const deleteProduct = async () => {
    try {
      const res = await fetchWithAuth(
        `http://localhost:5000/admin/products/${product[`_id`]}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        handleToggle();
        alert("Product deleted successfully");
      } else {
        const errorData = await res.json();
        alert(
          `Failed to delete product: ${errorData.message || res.statusText}`
        );
      }
    } catch (error) {
      alert(`Error: ${error.message || "An unexpected error occurred"}`);
    }
  };

  return (
    <article className="card product-item">
      <header className="card__header">
        <h1 className="product__title">{product[`title`]}</h1>
      </header>
      <div className="card__image">
        <img src={product[`imageUrl`]} alt={product[`title`]} />
      </div>
      <div className="card__content">
        <h2 className="product__price">${product[`price`]}</h2>
        <p className="product__description">{product[`description`]}</p>
      </div>
      <div className="card__actions">
        {location.pathname.includes("admin") ? (
          <>
            <button className="btn" onClick={navigateToEdit}>
              Edit
            </button>
            <button className="btn" onClick={deleteProduct}>
              Delete
            </button>
          </>
        ) : (
          <>
            {location.pathname.includes("product") ? (
              <button className="btn" onClick={() => navigate("/")}>
                Back to shop
              </button>
            ) : (
              <button className="btn" onClick={navigateToDetail}>
                Detail
              </button>
            )}

            <button className="btn" onClick={addToCart}>
              Add to Cart
            </button>
          </>
        )}
      </div>
    </article>
  );
};

export default ProductItem;
