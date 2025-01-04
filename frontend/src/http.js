import { useNavigate } from "react-router-dom";
export const portURL = "https://mern-dummy-project.onrender.com"
export const useFetchWithAuth = () =>
{
  const navigate = useNavigate();

  const fetchWithAuth = async (url, options = {}) =>
  {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(portURL + url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });

      // Nếu phản hồi không thành công
      if (!res.ok) {
        const errorData = await res.json();
        throw {
          status: res.status,
          message: errorData.message || "An error occurred",
          errors: errorData.errors || [],
        };
      }

      return res; // Nếu thành công, trả về phản hồi
    } catch (error) {
      // Tự động xử lý lỗi và điều hướng đến trang lỗi
      if (error.status === 400) {
        navigate("/400");
      } else if (error.status === 404) {
        navigate("/404");
      } else if (error.status === 500) {
        navigate("/500");
      } else {
        navigate("/500");
      }

      throw error; // Ném lỗi ra ngoài nếu muốn xử lý thêm ở nơi gọi
    }
  };

  return { fetchWithAuth };
};
