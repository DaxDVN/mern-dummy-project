import { useState, useEffect } from "react";

const ProductForm = ({ initialState, onSubmit, fetchData, errorMessage }) => {
  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (fetchData) fetchData(setInput);
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const response = await onSubmit(input);

    if (response.errors) {
      const errorObj = response.errors.reduce((acc, error) => {
        acc[error.path] = error.msg;
        return acc;
      }, {});
      setErrors(errorObj);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {["title", "imageUrl", "price", "description"].map((field) => (
        <div className="form-control" key={field}>
          <label htmlFor={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type="text"
            name={field}
            id={field}
            onChange={handleChange}
            value={input[field]}
          />
          {errors[field] && (
            <div className="error-message user-message--error">
              {errors[field]}
            </div>
          )}
        </div>
      ))}
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
