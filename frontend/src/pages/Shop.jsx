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
      <div className="w-full mt-20 md:mt-40"></div>
      <div className="-products w-full flex flex-col items-center justify-center gap-25 max-sm:gap-15">
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
