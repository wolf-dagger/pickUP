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
      <div className="mt-30 md:mt-30 flex justify-center items-center mb-10 md:mb-30">
        <h1 className="text-3xl md:text-5xl">CART</h1>
      </div>

      {cartItems.length === 0 ? (
        <>
          <div className="w-full  flex justify-center items-center flex-col gap-10">
            <h1 className="text-2xl md:text-5xl uppercase">
              Your cart is empty
            </h1>
            <div className="flex justify-center items-center w-50 flex-col gap-10">
              <img
                className=""
                src="../../public/emptycart.png"
                alt="empty cart"
              />
            </div>
            <div>
              <Link to="/shop">
                <button
                  className="text-white bg-brand box-border border font-medium leading-5 rounded-base text-2xl md:text-4xl border-blue-500
               hover:bg-blue-600 transition-colors duration-300 ease-in-out rounded-lg cursor-pointer px-5 py-2 md:py-5 uppercase"
                >
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
