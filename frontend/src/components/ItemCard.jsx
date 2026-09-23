import { Link } from "react-router-dom";

const ItemCard = ({ product }) => {
  return (
    <>
      <div className="mainOuter group relative h-75 max-w-lg overflow-hidden rounded-3xl border border-blue-500/20 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 p-3 shadow-lg shadow-blue-950/30 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/20 md:h-125 md:p-4">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all duration-300 group-hover:bg-blue-400/20" />
        <div className="imageContent relative flex justify-center items-center rounded-2xl">
          <Link to={`/product/${product._id}`}>
            <img
              className="productImage h-40 w-full rounded-2xl object-cover object-center ring-1 ring-blue-400/30 transition-transform duration-500 group-hover:scale-[1.02] md:h-80"
              src={product.imageUrl}
              alt={product.name}
            />
          </Link>
        </div>
        <div className="textContent relative flex flex-col items-center justify-between gap-1 pt-3">
          <h1 className="text-lg font-semibold text-blue-300 md:text-2xl">
            {product.name.split(" ").slice(0, 2).join(" ")}
          </h1>
          <h5 className="mb-2 mt-1 text-xl font-semibold tracking-tight text-slate-400 md:text-2xl">
            Price:{" "}
            <span className="text-orange-700">₹{product.price.toFixed(2)}</span>
          </h5>
          <button>
            <Link
              to={`/product/${product._id}`}
              className="w-full cursor-pointer rounded-lg border border-blue-500/70 px-3 py-2 text-sm font-medium leading-5 text-white transition-colors duration-300 ease-in-out hover:bg-blue-600 md:w-80"
            >
              Product Details
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
