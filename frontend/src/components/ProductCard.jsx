import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group w-40 sm:w-75 max-w-xs overflow-hidden rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md dark:bg-slate-900 dark:ring-slate-800 sm:p-4 flex flex-col">
      {/* Image */}
      <div className="aspect-square overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-fit transition-transform duration-300 group-hover:scale-105 justify-between items-center m-auto"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 px-1 pt-3 sm:px-2 sm:pt-4">
        <h3 className="truncate text-[11px] font-bold italic text-slate-800 dark:text-slate-100 sm:text-xs lg:text-[11px] xl:text-xs">
          {product.name}
        </h3>
        <p className="text-[10px] font-semibold text-slate-900 dark:text-slate-50 sm:text-[11px] lg:text-[10px] xl:text-[11px]">
          Price:{" "}
          <span className="text-orange-600">₹{product.price.toFixed(2)}</span>
        </p>

        <button className="w-full">
          <Link
            className="w-[50%] rounded-lg inline-flex items-center justify-center bg-slate-900 py-2 text-[10px] font-bold italic text-white transition-colors hover:bg-orange-500 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-orange-400 sm:py-2.5 sm:text-[11px] lg:text-[10px] xl:text-[11px]"
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
