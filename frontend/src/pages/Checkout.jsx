import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.qty ?? 1),
    0,
  );

  const handlePayment = async () => {
    const address = { fullName, street, city, postalCode, country };

    try {
      if (!window.Razorpay) {
        alert("Payment service is unavailable. Please refresh and try again.");
        return;
      }

      const orderRes = await fetch("/api/payment/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          amount: totalPrice,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        alert(orderData.message || "Unable to start payment");
        return;
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "pickUP",
        description: "Test Transaction",
        order_id: orderData.order.id,
        handler: async (response) => {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          if (!verifyRes.ok) {
            return alert("Payment verification failed");
          }

          const saveOrderRes = await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              items: cartItems.map((item) => ({
                productId: item._id,
                qty: item.qty ?? 1,
                price: item.price,
              })),
              totalAmount: totalPrice,
              address,
              paymentId: response.razorpay_payment_id,
            }),
          });

          if (saveOrderRes.ok) {
            dispatch(clearCart());
            navigate("/ordersuccess");
          } else {
            alert("Order Saving Failed");
          }
        },
        prefill: {
          name: fullName,
          email: user?.email,
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to checkout");
      navigate("/login");
      return;
    }
    handlePayment();
  };

  return (
    <>
      <div className="checkoutPage mt-40 mb-20 w-full">
        <div className="w-full flex justify-center items-center mb-10">
          <h1 className="text-3xl font-bold uppercase text-blue-400 font-mono md:text-6xl">
            Checkout
          </h1>
        </div>
        <div className="checkoutform ring-1 ring-slate-200 shadow-lg w-[90%] md:w-[55%] mx-auto p-4 rounded-lg">
          <form
            className="w-[90%] mx-auto flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="w-full mb-5 flexgap">
              <label
                htmlFor="name"
                className="block max-sm:text-sm text-xl font-medium text-heading"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setFullName(e.target.value)}
                className="inputdesigne"
                placeholder="john smith"
                required
              />
            </div>
            <div className="mb-5 flexgap">
              <label
                htmlFor="street"
                className="block max-sm:text-sm text-xl font-medium text-heading"
              >
                Street
              </label>
              <input
                type="text"
                id="street"
                onChange={(e) => setStreet(e.target.value)}
                className="inputdesigne"
                placeholder="street address"
                required
              />
            </div>
            <div className="mb-5 flexgap">
              <label
                htmlFor="city"
                className="block max-sm:text-sm text-xl font-medium text-heading"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                onChange={(e) => setCity(e.target.value)}
                className="inputdesigne"
                placeholder="city"
                required
              />
            </div>
            <div className="mb-5 flexgap">
              <label
                htmlFor="postalCode"
                className="block max-sm:text-sm text-xl font-medium text-heading"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                onChange={(e) => setPostalCode(e.target.value)}
                className="inputdesigne"
                placeholder="120034"
                required
              />
            </div>
            <div className="mb-5 flexgap">
              <label
                htmlFor="country"
                className="block max-sm:text-sm text-xl font-medium text-heading"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                onChange={(e) => setCountry(e.target.value)}
                className="inputdesigne"
                placeholder="India"
                required
              />
            </div>

            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="text-white bg-brand box-border border font-medium leading-5 rounded-base text-sm px-2 py-2 border-blue-500
              w-80 hover:bg-blue-600 transition-colors duration-300 ease-in-out rounded-lg  cursor-pointer"
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        </div>
        <div className="w-full flex justify-center items-center mt-10">
          <h1 className="text-3xl font-bold">
            Total Amount: ₹{totalPrice.toFixed(2)}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Checkout;

// <main className="checkoutPage mt-20 flex justify-center">
//   <section className="w-[95%] max-w-2xl">
//     <h1 className="text-3xl font-bold">Checkout</h1>
//     <p className="mt-6 text-2xl font-semibold">
//       Total: ₹{totalPrice.toFixed(2)}
//     </p>
//   </section>
// </main>
