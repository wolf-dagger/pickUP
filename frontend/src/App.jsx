import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";
import AddProduct from "./admin/AddProduct";
import AllProducts from "./admin/AllProducts";
import UpdateProduct from "./admin/UpdateProduct";
import AllUsers from "./admin/AllUsers";
import Analytics from "./admin/Analytics";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 1500,
            style: {
              background: "#0f1d3d",
              color: "#e2e8f0",
              border: "1px solid rgba(96, 165, 250, 0.35)",
              borderRadius: "14px",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ordersucess" element={<OrderSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
