import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user?.token, products]);

  if (loading) return <>loading...</>;

  return (
    <>
      <div className="w-full mt-20 md:mt-30">
        <h1 className="text-3xl md:text-5xl uppercase font-bold bg-linear-to-r from-blue-400 via-blue-600 to-indigo-800 bg-clip-text text-transparent text-center">
          All Products
        </h1>
      </div>
      <div className="w-full flex justify-center items-center mt-10 mb-10">
        <div className="w-[98%] flex flex-col justify-center items-center">
          {products.map((product) => (
            <AdminProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
