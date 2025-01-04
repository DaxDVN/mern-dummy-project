import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useFetchWithAuth } from "../http";
import { useState } from "react";
const AddProduct = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { fetchWithAuth } = useFetchWithAuth();
  const handleAdd = async (input) => {
    try {
      const res = await fetchWithAuth("/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (res.ok) {
        navigate("/admin");
      } else {
        const data = await res.json();
        setErrorMessage(data.errors?.[0]?.msg || "Failed to add product");
        return data;
      }
    } catch (error) {
      setErrorMessage("Error submitting form: " + error.message);
    }
  };

  return (
    <main>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <ProductForm
        initialState={{ title: "", imageUrl: "", price: "", description: "" }}
        onSubmit={handleAdd}
      />
    </main>
  );
};

export default AddProduct;
