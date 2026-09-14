import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group flex w-full min-w-0 max-w-45 flex-col overflow-hidden rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900 dark:ring-slate-800 sm:max-w-55 sm:rounded-2xl sm:p-4 lg:p-5">
      {/* Image */}
      <div className="aspect-square overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 sm:rounded-xl">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 px-0.5 pt-2.5 sm:gap-2 sm:px-1 sm:pt-4">
        <h3 className="truncate text-xs font-bold text-slate-800 dark:text-slate-100 sm:text-sm lg:text-base">
          {product.name}
        </h3>
        <p className="text-[10px] font-semibold text-slate-900 dark:text-slate-50 sm:text-xs lg:text-sm">
          Price:{" "}
          <span className="text-orange-600">₹{product.price.toFixed(2)}</span>
        </p>

        <button className="w-full">
          <Link
            className="inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-2 py-2 text-[10px] font-bold text-white transition-colors hover:bg-orange-500 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-orange-400 sm:py-2.5 sm:text-xs lg:text-sm"
            to={`/product/${product._id}`}
          >
            View Product
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
