import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products`);
        const data = await res.json();
        setProducts(data.slice(0, 4));
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
      <div className="home-container container">
        <div className="home-banner">
          <h1>Welcome to PickUP</h1>
          <p>Online Shopping Made Easy</p>
        </div>
        <div>
          <h2>Featured Products</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
