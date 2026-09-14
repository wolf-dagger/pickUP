import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          console.log("failed to fetch product");
          throw new Error(`Failed to fetch product: ${res.status}`);
        }
        const data = await res.json();
        setProduct(data.product);
        console.log("Product fetched succescully: ", data.product);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div>Product Not Found</div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          productId: product._id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          qty: 1,
        }),
      );
    }
  };

  return (
    <>
      <div className="w-full h-20 md:h-30"></div>
      <div className="breadcrumbs">
        {/* Breadcrumbs */}
        <nav className="flex mb-10" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link
                to={"/"}
                className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
              >
                <svg
                  className="w-4 h-4 me-1.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                  />
                </svg>
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center space-x-1.5">
                <svg
                  className="w-3.5 h-3.5 rtl:rotate-180 text-body"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m9 5 7 7-7 7"
                  />
                </svg>
                <Link
                  to={"/shop"}
                  className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
                >
                  Products
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center space-x-1.5">
                <svg
                  className="w-3.5 h-3.5 rtl:rotate-180 text-body"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m9 5 7 7-7 7"
                  />
                </svg>
                <span className="inline-flex items-center text-sm font-medium text-body-subtle">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        <div className="imageContent md:flex max-sm:flex max-sm:flex-col w-full h-screen mt-5 p-4 gap-2">
          <div className="w-full h-1/2 md:h-[80%] flex justify-center items-center p-2">
            <img src={product.imageUrl} alt="product name" className="" />
          </div>
          <div className="textContent w-full h-1/2 md:h-[80%] p-5">
            <div className="flex flex-col gap-5">
              <p>Category: {product.category}</p>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-lg font-bold">Price: ₹{product.price}</p>
              <p className="text-lg font-bold">
                Description: {product.description}
              </p>
              <p>In Stock: {product.stock > 0 ? "In Stock" : "Out of Stock"}</p>
              <p>Total Reviews: {product.numReviews}</p>
              <p>Rating: {product.rating}</p>
              <div className="flex justify-center items-center">
                <button
                  onClick={handleAddToCart}
                  className="text-white bg-brand box-border border font-medium leading-5 rounded-base text-sm px-2 py-2 border-blue-500
              w-80 hover:bg-blue-600 transition-colors duration-300 ease-in-out rounded-lg  cursor-pointer flex justify-center items-center"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
