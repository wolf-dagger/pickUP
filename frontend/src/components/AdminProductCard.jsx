import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import { useContext } from "react";

const AdminProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      console.log("Product deleted successfully");
      window.location.reload();
      alert("Product deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="w-full md:w-[70%] h-30 rounded-xl mt-4 flex gap-5 bg-blue-950 p-2">
        <div className=" w-25 h-25 flex justify-center items-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center rounded-xl"
          />
        </div>
        <div className=" w-full flex justify-between">
          <div className="w-full">
            <h1 className="text-lg md:text-2xl">{product.name}</h1>
            <h1>{product.category}</h1>
            <h1>{product.price}</h1>
          </div>
          <div className=" flex flex-col md:flex-row gap-2 md:justify-center md:items-center">
            <button
              className="h-7 px-4 py-2 rounded-lg border border-red-500 text-sm font-medium leading-5 text-white transition-colors duration-300 ease-in-out hover:bg-red-600 flex justify-center items-center md:text-xl cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </button>

            <Link to={`/update-product/${product._id}`}>
              <button className="h-7 px-4 py-2 cursor-pointer rounded-lg border border-orange-500 text-sm font-medium leading-5 text-white transition-colors duration-300 ease-in-out hover:bg-orange-600 flex justify-center items-center md:text-xl">
                Update
              </button>
            </Link>
            <Link
              to={`/product/${product._id}`}
              className="h-7 px-4 py-2 cursor-pointer rounded-lg border border-green-500 text-sm font-medium leading-5 text-white transition-colors duration-300 ease-in-out hover:bg-green-600 flex justify-center items-center md:text-xl"
            >
              <button>View</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductCard;
