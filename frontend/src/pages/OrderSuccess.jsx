import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center text-white">
      <div className="w-[98%] h-full mt-40 md:mt-50 flex md:flex md:flex-row flex-col justify-center items-center">
        <div className="w-[98%] h-1/2">
          <img
            src="../../public/orderSuccess.png"
            alt="Order Success"
            className="object-center object-contain md:object-cover w-full h-full rounded-2xl"
          />
        </div>
        <div className="w-[98%] h-1/2 p-5 flex flex-col justify-center gap-10 items-center">
          <h1 className="text-2xl md:text-5xl text-center font-bold bg-linear-to-r from-green-400 via-emerald-500 to-green-700 bg-clip-text text-transparent">
            ORDER PLACED SUCCESSFULLY
          </h1>
          <p className="text-lg md:text-2xl text-center">THANK YOU</p>
          <Link to="/shop" className="text-lg md:text-2xl text-center">
            <button
              className="text-white bg-brand box-border border font-medium leading-5 rounded-base text-sm px-2 py-2 border-green-500
              w-80 hover:bg-green-600 transition-colors duration-300 ease-in-out rounded-lg cursor-pointer"
            >
              Back to Shop
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
