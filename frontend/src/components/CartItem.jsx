const CartItem = ({ cartItems, handleRemove, handleUpdateQty }) => {
  return (
    <>
      {cartItems.map((item) => (
        <div
          className="group relative flex h-60 w-full items-center justify-between gap-2 overflow-hidden rounded-3xl border border-blue-500/20 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 p-3 shadow-lg shadow-blue-950/30 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/15 max-sm:h-44"
          key={item._id}
        >
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all duration-300 group-hover:bg-blue-400/20" />
          <div className="cartImage relative h-full w-[30%]">
            <img
              className="h-full w-full rounded-2xl object-cover object-center ring-1 ring-blue-400/30"
              src={item.imageUrl}
              alt={item.name}
            />
          </div>
          <div className="cartText relative flex h-full w-[40%] flex-col justify-center gap-2 p-2 md:gap-3">
            <h1 className="text-sm font-semibold text-white md:text-2xl">
              {item.name}
            </h1>
            <p className="text-xs text-slate-300 md:text-base">
              Price: ₹{item.price}
            </p>
            <p className="text-xs text-slate-300 md:text-base">
              Quantity: {item.qty}
            </p>
          </div>
          <div className="cartButtn relative flex h-full w-[30%] flex-col items-center justify-center gap-2 sm:flex-row sm:justify-around">
            <button
              className="h-9 w-12 cursor-pointer rounded-lg border border-orange-500/70 text-white transition-colors duration-300 ease-in-out hover:bg-orange-600 md:h-10 md:w-16"
              onClick={() => handleUpdateQty(item, item.qty - 1)}
            >
              <h1 className="text-2xl">-</h1>
            </button>
            <button
              className="h-9 w-12 cursor-pointer rounded-lg border border-green-500/70 text-white transition-colors duration-300 ease-in-out hover:bg-green-600 md:h-10 md:w-16"
              onClick={() => handleUpdateQty(item, item.qty + 1)}
            >
              <h1 className="text-2xl">+</h1>
            </button>
            <button
              className="h-9 w-16 cursor-pointer rounded-lg border border-red-500/70 text-white transition-colors duration-300 ease-in-out hover:bg-red-600 md:h-10 md:w-20"
              onClick={() => handleRemove(item._id)}
            >
              <h1 className="text-lg">Remove</h1>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItem;
