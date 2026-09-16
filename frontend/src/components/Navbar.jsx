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
      <div className="flex flex-col justify-center items-center">
        <nav className="w-[90%] h-15 md:h-20 p-2 flex bg-gray-900 rounded-lg max-sm:rounded-3xl justify-between items-center fixed top-2 z-50 gap-2">
          <div className="logo w-[20%] h-full flex justify-start items-center">
            <Link to="/" element={<Home />}>
              <img src="/pickUPDark.svg" alt="pickup" className="w-25" />
            </Link>
          </div>
          <div className="navigation w-[80%] h-full flex justify-end items-center p-3">
            <ul className="flex gap-5 md:gap-20 md:text-2xl text-md ">
              <Link to="/shop">
                <li className="text-xl md:text-2xl hover:text-blue-500 transition-colors duration-300">
                  Shop
                </li>
              </Link>
              <Link to="/cart">
                <li className="relative w-12 hover:text-blue-500 transition-colors duration-300">
                  <IoCartOutline size={30} />
                  {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </li>
              </Link>
              {user ? (
                <>
                  <div className="flex items-center gap-4">
                    <Link to="/profile">
                      {/* Mobile */}
                      <div className="sm:hidden">
                        <Avatar
                          name={user.name}
                          round={false}
                          size="25"
                          maxInitials={2}
                        />
                      </div>

                      {/* Desktop */}
                      <div className="hidden sm:block">
                        <Avatar
                          name={user.name}
                          round={false}
                          size="35"
                          maxInitials={2}
                        />
                      </div>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <li className="text-xl md:text-2xl hover:text-blue-500 transition-colors duration-300">
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
