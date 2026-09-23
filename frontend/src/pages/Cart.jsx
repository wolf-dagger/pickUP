import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, addToCart } from "../redux/cartSlice";
import CartItem from "../components/CartItem";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  return (
    <>
      <div className="mt-30 md:mt-35 flex justify-center items-center mb-10">
        <h1 className="text-3xl md:text-5xl uppercase font-bold bg-linear-to-r from-blue-400 via-blue-600 to-indigo-800 bg-clip-text text-transparent text-center">
          CART
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <>
          <div className="mx-auto flex w-[92%] max-w-2xl flex-col items-center justify-center overflow-hidden rounded-3xl border border-blue-500/20 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 px-6 py-10 shadow-xl shadow-blue-950/30 md:py-14">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-3xl text-cyan-300 shadow-lg shadow-cyan-950/30">
              🛒
            </div>
            <h1 className="text-center text-2xl font-bold uppercase tracking-wide text-white md:text-4xl">
              Your cart is empty
            </h1>
            <p className="mt-3 max-w-md text-center text-sm text-slate-400 md:text-base">
              Nothing here yet. Find something useful and make it yours.
            </p>
            <div className="mt-8 flex w-40 justify-center items-center flex-col">
              <img
                className="h-36 w-full object-contain opacity-90 drop-shadow-lg md:h-44"
                src="/emptycart.png"
                alt="empty cart"
              />
            </div>
            <div className="mt-8">
              <Link to="/shop">
                <button className="cursor-pointer rounded-lg border border-blue-400/70 bg-blue-500/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-cyan-200 transition-colors duration-300 ease-in-out hover:bg-blue-600 hover:text-white md:px-8">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="cartContent w-full mt-10 flex justify-center items-center">
            <div className="w-[95%] p-2  flex flex-col gap-5">
              <CartItem
                cartItems={cartItems}
                handleRemove={handleRemove}
                handleUpdateQty={handleUpdateQty}
              />
              <p className="mt-4 text-right font-semibold text-2xl">
                Grand Total: ₹{totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="w-full mt-10 mb-10 flex justify-center items-center">
            <Link to="/checkout">
              <button
                className="text-white bg-brand box-border border font-medium leading-5 rounded-base text-2xl md:text-4xl border-blue-500
               hover:bg-blue-600 transition-colors duration-300 ease-in-out rounded-lg cursor-pointer px-5 py-2 md:py-5 uppercase"
              >
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
