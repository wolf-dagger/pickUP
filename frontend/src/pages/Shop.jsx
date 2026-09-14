import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products`);
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.status}`);
        }

        const data = await res.json();
        setProducts(data.products.slice(0, 4));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="w-full h-10"></div>
      <div className="featured-products w-full flex flex-col items-center justify-center gap-25 max-sm:gap-15">
        <h1 className="bg-linear-to-r from-orange-500 to-white bg-clip-text text-transparent text-4xl font-bold uppercase">
          Featured Products
        </h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="product-grid w-[95%] just grid max-sm:grid-cols-2 grid-cols-4 gap-5 max-sm:gap-4">
            {products.map((product) => (
              <ItemCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Shop;
