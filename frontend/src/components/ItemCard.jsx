import { Link } from "react-router-dom";

const ItemCard = ({ product }) => {
  return (
    <>
      <div className="block max-w-sm overflow-hidden rounded-lg border border-slate-700 bg-slate-900 shadow-sm">
        <Link to={`/product/${product._id}`}>
          <img
            className="w-full rounded-t-lg"
            src={product.imageUrl}
            alt={product.name}
          />
        </Link>
        <div className="p-6 text-center">
          <span className="inline-flex items-center rounded-sm px-1.5 py-0.5 text-xs font-medium text-orange-400">
            {product.name.split(" ").slice(0, 2).join(" ")}
          </span>
          <h5 className="mb-6 mt-3 text-2xl font-semibold tracking-tight text-slate-100">
            Price:{" "}
            <span className="text-orange-600">₹{product.price.toFixed(2)}</span>
          </h5>
          <button>
            <Link
              to={`/product/${product._id}`}
              className="inline-flex px-2! py-0.5! items-center rounded-lg bg-orange-500 text-sm font-medium leading-5 text-white shadow-sm transition-colors hover:bg-orange-400"
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
