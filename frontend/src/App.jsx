import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Router>
        <Navbar />
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
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
