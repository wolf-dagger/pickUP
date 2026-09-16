import { Link } from "react-router-dom";

const ItemCard = ({ product }) => {
  return (
    <>
      <div className="mainOuter max-w-lg h-75 md:h-125 rounded-lg p-2 border border-blue-400 shadow-md hover:shadow-blue-200  hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="imageContent flex justify-center items-center rounded-lg">
          <Link to={`/product/${product._id}`}>
            <img
              className="productImage h-40 md:h-80 w-full rounded-lg"
              src={product.imageUrl}
              alt={product.name}
            />
          </Link>
        </div>
        <div className="textContent flex flex-col justify-between items-center">
          <h1 className="text-lg md:text-2xl font-semibold text-blue-400">
            {product.name.split(" ").slice(0, 2).join(" ")}
          </h1>
          <h5 className="mb-2 mt-1 text-2xl font-semibold tracking-tight text-slate-400">
            Price:{" "}
            <span className="text-orange-700">₹{product.price.toFixed(2)}</span>
          </h5>
          <button>
            <Link
              to={`/product/${product._id}`}
              className="text-white bg-brand box-border border font-medium leading-5 rounded-base text-sm px-2 py-2 border-blue-500
              w-80 hover:bg-blue-600 transition-colors duration-300 ease-in-out rounded-lg  cursor-pointer"
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
