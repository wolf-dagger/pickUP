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
      <div className="group relative mt-4 flex min-h-32 w-full flex-col gap-4 overflow-hidden rounded-3xl border border-blue-500/20 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 p-3 shadow-lg shadow-blue-950/30 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/15 md:w-[70%] md:flex-row md:items-center md:gap-5 md:p-4">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all duration-300 group-hover:bg-blue-400/20" />
        <div className="relative h-28 w-full shrink-0 flex justify-center items-center md:h-24 md:w-24">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full rounded-2xl object-cover object-center ring-1 ring-blue-400/30"
          />
        </div>
        <div className="relative flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full">
            <h1 className="text-lg font-semibold text-white md:text-2xl">
              {product.name}
            </h1>
            <h1 className="text-sm uppercase tracking-wider text-slate-400">
              {product.category}
            </h1>
            <h1 className="mt-1 text-lg font-semibold text-orange-400">
              ₹{product.price}
            </h1>
          </div>
          <div className="flex flex-wrap gap-2 md:justify-center md:items-center">
            <button
              className="flex h-9 cursor-pointer items-center justify-center rounded-lg border border-red-500/70 px-4 text-sm font-medium leading-5 text-white transition-colors duration-300 ease-in-out hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </button>

            <Link to={`/update-product/${product._id}`}>
              <button className="flex h-9 cursor-pointer items-center justify-center rounded-lg border border-orange-500/70 px-4 text-sm font-medium leading-5 text-white transition-colors duration-300 ease-in-out hover:bg-orange-600">
                Update
              </button>
            </Link>
            <Link
              to={`/product/${product._id}`}
              className="flex h-9 cursor-pointer items-center justify-center rounded-lg border border-green-500/70 px-4 text-sm font-medium leading-5 text-white transition-colors duration-300 ease-in-out hover:bg-green-600"
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
