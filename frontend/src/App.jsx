import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Shop from "./pages/Shop.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import Cart from "./pages/Cart.jsx";
import Order from "./pages/Order.jsx";
import Detail from "./pages/Detail.jsx";
import Products from "./pages/Products.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./layouts/ProtectedRoute.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route index element={<Shop />} />
          <Route path={"product/:id"} element={<Detail />} />
          <Route path={"cart"} element={<Cart />} />
          <Route path={"order"} element={<Order />} />
          <Route path={"login"} element={<Login />} />
          <Route path={"register"} element={<Register />} />

          <Route path="admin" element={<ProtectedRoute />}>
            <Route index element={<Products />} />
            <Route path={"add-product"} element={<AddProduct />} />
            <Route path={"edit-product/:id"} element={<EditProduct />} />
          </Route>
          <Route path="/404" element={<ErrorPage />} />
          <Route path="/500" element={<ErrorPage />} />
          <Route path="/400" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
