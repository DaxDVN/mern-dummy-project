import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const Navigation = () => {
  const location = useLocation();
  const [path, setPath] = useState("/");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setPath(location.pathname);
    setIsLoggedIn(!!localStorage.getItem("token")); // Kiểm tra token
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <ul className="main-header__item-list">
          <li className="main-header__item">
            <Link className={path === "/" ? "active" : ""} to="/">
              Shop
            </Link>
          </li>
          {isLoggedIn && (
            <>
              <li className="main-header__item">
                <Link className={path === "/cart" ? "active" : ""} to="/cart">
                  Cart
                </Link>
              </li>
              <li className="main-header__item">
                <Link className={path === "/order" ? "active" : ""} to="/order">
                  Order
                </Link>
              </li>
              <li className="main-header__item">
                <Link
                  className={path === "/add-product" ? "active" : ""}
                  to="/admin/add-product"
                >
                  Add Product
                </Link>
              </li>
              <li className="main-header__item">
                <Link className={path === "/admin" ? "active" : ""} to="/admin">
                  Admin
                </Link>
              </li>
              <li className="main-header__item">
                <button onClick={handleLogout} className="btn">
                  Logout
                </button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li className="main-header__item">
                <Link className={path === "/login" ? "active" : ""} to="/login">
                  Login
                </Link>
              </li>
              <li className="main-header__item">
                <Link
                  className={path === "/register" ? "active" : ""}
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
