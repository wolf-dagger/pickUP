import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setProduct(data.product);
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setStock(data.product.stock);
        setCategory(data.product.category);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoadingProduct(false);
      }
    };
    fetchProduct();
  }, [id, user?.token]);

  const handleImage = (e) => {
    setImage(e.target.files[0] || null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update product");
      }

      setProduct(data.product);
      alert("Product updated successfully");
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
      navigate("/all-products");
    }
  };

  if (loadingProduct) return <p className="mt-30 text-center">Loading...</p>;
  if (!product)
    return <p className="mt-30 text-center">{error || "Product not found"}</p>;

  return (
    <>
      <div className="w-full mt-20 md:mt-30">
        <h1 className="uppercase text-center text-xl md:text-4xl font-bold text-cyan-500 mb-10">
          Update Product
        </h1>
      </div>
      <div className="flex flex-col rounded-xl border-2 border-blue-500 max-sm:w-[95%] w-[40%] mx-auto justify-center items-center m-auto p-2 mb-10">
        <form
          className="w-[90%] mx-auto flex flex-col gap-5 mt-2"
          onSubmit={handleUpdate}
        >
          <div className="w-full mb-2 flexgap">
            <label
              htmlFor="name"
              className="block max-sm:text-sm text-xl font-medium text-slate-300"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="inputdesigne"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2 flexgap">
            <label
              htmlFor="description"
              className="block max-sm:text-sm text-xl font-medium text-slate-300"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              className="w-full h-20 md:h-40 resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder-slate-400 shadow-sm outline-none transition-all duration-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
              placeholder="Describe your product..."
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="w-full flexgap">
              <label
                htmlFor="price"
                className="block max-sm:text-sm text-xl font-medium text-slate-300"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                min="0"
                step="0.01"
                className="inputdesigne"
                placeholder="599.00"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="w-full flexgap">
              <label
                htmlFor="category"
                className="block max-sm:text-sm text-xl font-medium text-slate-300"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={category}
                className="inputdesigne"
                placeholder="Food,Electronics,etc"
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="w-full flexgap">
            <label
              htmlFor="stock"
              className="block max-sm:text-sm text-xl font-medium text-slate-300"
            >
              In Stock
            </label>
            <input
              type="text"
              id="stock"
              name="stock"
              value={stock}
              min="0"
              step="1"
              className="inputdesigne"
              onChange={(e) => setStock(e.target.value)}
              placeholder="10"
              required
            />
          </div>
          <div className="w-full flexgap">
            <label
              htmlFor="productImage"
              className="block max-sm:text-sm text-xl font-medium text-heading"
            >
              Product Image
            </label>

            <input
              type="file"
              id="productImage"
              name="image"
              accept="image/*"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              onChange={handleImage}
            />
          </div>
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-80 cursor-pointer rounded-lg border border-blue-500 px-2 py-2 text-sm font-medium leading-5 text-white transition-colors duration-300 ease-in-out hover:bg-blue-600"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
