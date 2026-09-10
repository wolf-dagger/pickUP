import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="outer flex justify-center items-center h-25">
      <div className="sticky top-2 z-50 rounded-2xl border border-slate-700 bg-slate-900/95 shadow-sm backdrop-blur-sm sm:w-[95%] w-full">
        <nav className="navbar flex items-center justify-between pl-8 pr-16 py-3 w-[95%]">
          <div className="navbar-brand flex justify-center items-center">
            <Link to="/" className="navbar-item">
              <img className="h-20 w-auto" src="/pickUPDark.svg" alt="pickUP" />
            </Link>
          </div>

          <div className="navbar-menu flex items-center gap-4">
            <ul className="navbar-links flex gap-5 text-[11px] font-bold italic text-slate-200 sm:gap-10 sm:text-xs lg:text-[11px] xl:text-xs pr-4">
              <li>
                <Link
                  to="/shop"
                  className="transition-colors hover:text-orange-400"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="transition-colors hover:text-orange-400"
                >
                  Cart ({cartItems.length})
                </Link>
              </li>
              {user ? (
                <li>
                  <Link
                    to="/profile"
                    className="transition-colors hover:text-orange-400"
                  >
                    Hi, {user.name}
                  </Link>
                  {user.role === "admin" && (
                    <li>
                      <Link to={"/admin"}>Admin</Link>
                    </li>
                  )}
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="transition-colors hover:text-orange-400"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="transition-colors hover:text-orange-400"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
