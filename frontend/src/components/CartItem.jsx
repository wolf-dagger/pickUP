const CartItem = ({ cartItems, handleRemove, handleUpdateQty }) => {
  return (
    <>
      {cartItems.map((item) => (
        <div
          className="w-full h-60 max-sm:h-40 rounded-lg ring-1 ring-slate-200 shadow-lg hover:shadow-blue-400 flex justify-between items-center p-2"
          key={item._id}
        >
          <div className="cartImage w-[30%] h-full">
            <img
              className="rounded-lg object-center object-cover w-full h-full"
              src={item.imageUrl}
              alt={item.name}
            />
          </div>
          <div className="cartText  w-[40%] h-full flex flex-col justify-center p-2 gap-5">
            <h1 className="text-medium md:text-2xl">{item.name}</h1>
            <p>Price: ₹{item.price}</p>
            <p>Quantity: {item.qty}</p>
          </div>
          <div className="cartButtn w-[30%] h-full max-sm:flex max-sm:flex-col gap-2 flex items-center justify-around">
            <button
              className="text-white bg-brand box-border border font-medium leading-5 rounded-base text-sm border-orange-500
               hover:bg-orange-600 transition-colors duration-300 ease-in-out rounded-lg cursor-pointer w-20 h-10"
              onClick={() => handleUpdateQty(item, item.qty - 1)}
            >
              <h1 className="text-2xl">-</h1>
            </button>
            <button
              className="text-white bg-brand box-border border font-medium leading-5 rounded-base text-sm border-green-500
               hover:bg-green-600 transition-colors duration-300 ease-in-out rounded-lg cursor-pointer w-20 h-10"
              onClick={() => handleUpdateQty(item, item.qty + 1)}
            >
              <h1 className="text-2xl">+</h1>
            </button>
            <button
              className="text-white bg-brand box-border border font-medium leading-5 rounded-base text-sm border-red-500
               hover:bg-red-600 transition-colors duration-300 ease-in-out rounded-lg cursor-pointer w-20 h-10"
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
