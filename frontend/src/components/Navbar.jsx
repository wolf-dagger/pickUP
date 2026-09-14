import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";
import { useSelector } from "react-redux";
import Home from "../pages/Home";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <nav className="w-[90%] h-20 max-sm:h-15 bg-gray-900 rounded-lg max-sm:rounded-3xl flex justify-center items-center fixed top-2 z-50">
          <div className="flex justify-between items-center w-[95%]">
            <div className="my-5 mx-5">
              <Link to="/" element={<Home />}>
                <img
                  src="/pickUPDark.svg"
                  alt="pickup"
                  className="w-25 max-sm:w-17"
                />
              </Link>
            </div>
            <div className="flex gap-4">
              <div className="">
                <ul className="flex md:gap-10 md:text-xl text-sm ">
                  <li>
                    <Link
                      to="/shop"
                      className="rounded-lg px-2 py-2 transition-all duration-200 hover:text-blue-400"
                    >
                      Shop
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/cart"
                      className="rounded-lg px-2 py-2 transition-all duration-200 hover:text-blue-400"
                    >
                      Cart ({cartItems.length})
                    </Link>
                  </li>

                  {user ? (
                    <li className="flex items-center gap-3">
                      <Link
                        to="/profile"
                        className="rounded-lg px-2 py-2 transition-all duration-200 hover:text-blue-400"
                      >
                        {user.name}
                      </Link>

                      {user.role === "admin" && (
                        <li>
                          <Link
                            to="/admin"
                            className="rounded-lg px-2 py-2 transition-all duration-200 hover:text-blue-400"
                          >
                            Admin
                          </Link>
                        </li>
                      )}

                      <li>
                        <button
                          onClick={handleLogout}
                          className="rounded-lg border border-slate-700 px-3 py-2 text-slate-300 transition-all duration-200 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                        >
                          Logout
                        </button>
                      </li>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/login"
                          className="rounded-lg px-2 py-2 transition-all duration-200 hover:text-blue-400"
                        >
                          Login
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
