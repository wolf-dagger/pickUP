import { Link } from "react-router-dom";

const AdminPanel = () => {
  return (
    <>
      <div className="w-[98%] p-2 bg-blue-950 flex flex-col justify-center items-center rounded-xl">
        <h1 className="text-2xl md:text-4xl uppercase font-bold text-white">
          Admin Panel
        </h1>
        <div className="w-full mt-5 mb-5">
          <div className="w-full flex justify-around items-center gap-10 mb-5">
            <Link
              to="/all-users"
              className="text-white bg-brand box-border border font-normal font-mono leading-5 rounded-base text-sm md:text-2xl px-2 py-2 md:py-4 border-orange-500
              w-80 hover:bg-orange-600 transition-colors duration-300 ease-in-out rounded-lg  cursor-pointer uppercase text-center"
            >
              <button className="uppercase cursor-pointer">Users</button>
            </Link>
            <Link
              to="/all-products"
              className="text-white bg-brand box-border border font-normal font-mono leading-5 rounded-base text-sm md:text-2xl px-2 py-2 md:py-4 border-blue-500
              w-80 hover:bg-blue-600 transition-colors duration-300 ease-in-out rounded-lg cursor-pointer uppercase text-center"
            >
              <button className="uppercase">Products</button>
            </Link>
          </div>
          <div className="w-full flex justify-around items-center gap-10">
            <Link
              to="/add-product"
              className="text-white bg-brand box-border border font-normal font-mono leading-5 rounded-base text-sm md:text-2xl px-2 py-2 md:py-4 border-green-500
              w-80 hover:bg-green-600 transition-colors duration-300 ease-in-out rounded-lg  cursor-pointer text-center"
            >
              <button className="uppercase">Add Product</button>
            </Link>
            <Link
              to="/analytics"
              className="text-white bg-brand box-border border font-normal font-mono leading-5 rounded-base text-sm md:text-2xl px-2 py-2 md:py-4 border-purple-500
              w-80 hover:bg-purple-600 transition-colors duration-300 ease-in-out rounded-lg  cursor-pointer text-center"
            >
              <button className="uppercase">Analytics</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
