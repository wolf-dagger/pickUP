import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import Avatar from "react-avatar";
import { IoCartOutline } from "react-icons/io5";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <nav className="fixed top-3 z-50 flex h-16 w-[94%] items-center justify-between gap-3 rounded-3xl border border-blue-400/20 bg-linear-to-r from-slate-950/95 via-blue-950/95 to-slate-950/95 p-2 shadow-xl shadow-blue-950/30 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/40 md:top-4 md:h-20 md:w-[90%] md:px-4">
          <div className="pointer-events-none absolute inset-x-10 -bottom-px h-px bg-linear-to-r from-transparent via-cyan-400/70 to-transparent" />
          <div className="logo flex h-full w-[30%] items-center justify-start md:w-[24%]">
            <Link
              to="/"
              element={<Home />}
              className="flex items-center rounded-2xl px-2 py-1 transition-transform duration-300 hover:scale-[1.03]"
            >
              <img
                src="/pickUPDark.svg"
                alt="pickup"
                className="w-20 md:w-25"
              />
            </Link>
          </div>
          <div className="navigation flex h-full w-[70%] items-center justify-end md:w-[76%]">
            <ul className="flex items-center gap-1 text-sm md:gap-3 md:text-base">
              <Link to="/shop">
                <li className="rounded-xl px-3 py-2 font-medium text-slate-300 transition-all duration-300 hover:bg-blue-500/10 hover:text-cyan-300 md:px-4">
                  Shop
                </li>
              </Link>
              <Link to="/cart">
                <li className="relative flex h-10 w-11 items-center justify-center rounded-xl text-slate-300 transition-all duration-300 hover:bg-blue-500/10 hover:text-cyan-300">
                  <IoCartOutline className="text-xl md:text-2xl" />
                  {cartItems.length > 0 && (
                    <span className="absolute right-0 top-0 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full border border-slate-950 bg-orange-500 px-1 text-[10px] font-bold leading-none text-white shadow-lg shadow-orange-500/30">
                      {cartItems.length}
                    </span>
                  )}
                </li>
              </Link>
              {user ? (
                <>
                  <div className="ml-1 flex items-center gap-2 border-l border-slate-700/80 pl-2 md:ml-2 md:pl-3">
                    <Link
                      to="/profile"
                      title={`Open ${user.name}'s profile`}
                      className="flex items-center gap-2 rounded-2xl p-1 transition-colors duration-300 hover:bg-blue-500/10"
                    >
                      {/* Mobile */}
                      <div className="overflow-hidden rounded-xl ring-1 ring-blue-300/40 sm:hidden">
                        <Avatar
                          name={user.name}
                          round={false}
                          size="25"
                          maxInitials={2}
                        />
                      </div>

                      {/* Desktop */}
                      <div className="hidden overflow-hidden rounded-xl ring-1 ring-blue-300/40 sm:block">
                        <Avatar
                          name={user.name}
                          round={false}
                          size="35"
                          maxInitials={2}
                        />
                      </div>
                      <span className="hidden max-w-24 truncate text-sm font-medium text-slate-300 lg:block">
                        {user.name}
                      </span>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <li className="rounded-xl border border-blue-400/40 px-3 py-2 font-medium text-cyan-300 transition-all duration-300 hover:bg-blue-500 hover:text-white md:px-5">
                      Login
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

// <>
//   <div className="flex flex-col justify-center items-center">
//     <nav className=" w-[90%] h-20 max-sm:h-15 bg-gray-900 rounded-lg max-sm:rounded-3xl flex justify-center items-center fixed top-2 z-50">
//       <div className="flex justify-between items-center w-[95%]">
//         <div className="my-5 mx-5">
//           <Link to="/" element={<Home />}>
//             <img
//               src="/pickUPDark.svg"
//               alt="pickup"
//               className="w-25 max-sm:w-17"
//             />
//           </Link>
//         </div>
//         <div className="flex gap-4">
//           <div className="">
//             <ul className="flex md:gap-10 md:text-xl text-sm ">
//               <li>
//                 <Link
//                   to="/shop"
//                   className="rounded-lg px-2 py-2 transition-all duration-200 hover:text-blue-400"
//                 >
//                   Shop
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/cart"
//                   className="rounded-lg px-2 py-2 transition-all duration-200 hover:text-blue-400"
//                 >
//                   Cart ({cartItems.length})
//                 </Link>
//               </li>

//               {user ? (
//                 <li className="flex items-center gap-3">
//                   <Link
//                     to="/profile"
//                     className="rounded-lg px-2 py-2 transition-all duration-200 hover:text-blue-400"
//                   >
//                     <Avatar
//                       name={user.name}
//                       round={true}
//                       size="35"
//                       maxInitials={2}
//                       className="ml-2"

//                     />
//                   </Link>

//                   {user.role === "admin" && (
//                     <li>
//                       <Link
//                         to="/admin"
//                         className="rounded-lg px-2 py-2 transition-all duration-200 hover:text-blue-400"
//                       >
//                         Admin
//                       </Link>
//                     </li>
//                   )}

//                   <li>
//                     <button
//                       onClick={handleLogout}
//                       className="rounded-lg border border-slate-700 px-3 py-2 text-slate-300 transition-all duration-200 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </li>
//               ) : (
//                 <>
//                   <li>
//                     <Link
//                       to="/login"
//                       className="rounded-lg px-2 py-2 transition-all duration-200 hover:text-blue-400"
//                     >
//                       Login
//                     </Link>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </nav>
//   </div>
// </>
