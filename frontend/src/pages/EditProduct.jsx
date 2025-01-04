import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { portURL, useFetchWithAuth } from "../http";
import { useState } from "react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // Để lưu thông báo lỗi
  const { fetchWithAuth } = useFetchWithAuth();
  const handleEdit = async (input) => {
    try {
      const res = await fetchWithAuth(`/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (res.ok) {
        navigate("/admin");
      } else {
        const data = await res.json();
        setErrorMessage(data.errors?.[0]?.msg || "Failed to edit product");
        return data;
      }
    } catch (error) {
      setErrorMessage("Error submitting form: " + error.message);
    }
  };

  const fetchData = async (setInput) => {
    try {
      const res = await fetch(portURL + `/admin/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setInput(data);
      }
    } catch (error) {
      setErrorMessage("Error fetching data: " + error.message);
    }
  };

  return (
    <main>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <ProductForm
        initialState={{ title: "", imageUrl: "", price: "", description: "" }}
        onSubmit={handleEdit}
        fetchData={fetchData}
      />
    </main>
  );
};

export default EditProduct;
