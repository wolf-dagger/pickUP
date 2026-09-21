import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import { useNavigate } from "react-router-dom";
import OrderItems from "../components/OrderItems";
import AdminPanel from "../components/AdminPanel";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders/myorders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          return console.error("Failed to fetch orders");
        }

        const data = await response.json();
        console.log(data.orders);
        setOrders(data.orders);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.token]);

  return (
    <>
      <div className="profile_main w-full h-screen">
        <div className="w-full mt-20 md:mt-30">
          <h1 className=" ml-4 text-3xl md:text-5xl uppercase font-bold bg-linear-to-r from-blue-400 via-blue-600 to-indigo-800 bg-clip-text text-transparent">
            My Profile
          </h1>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-[98%] p-2 mt-5 rounded-lg ring-1 ring-blue-500 flex justify-between items-center">
            <div className="user_details flex flex-col gap-5">
              <h1 className="text-2xl md:text-4xl uppercase font-bold">
                {user.name}
              </h1>
              <p className="text-lg md:text-xl">Email: {user.email}</p>
              <p className="text-lg md:text-xl">Account Type: {user.role}</p>
              <p className="text-lg md:text-xl">
                Verified: {user.isVerified ? "✅" : "🚫"}
              </p>
            </div>
            <div className="action_buttons flex flex-col justify-center items-center gap-5">
              <button className="ring-1 ring-blue-500 hover:bg-blue-500 w-full p-2 rounded-lg transition-colors duration-200">
                Edit Profile
              </button>
              <button
                className="ring-1 ring-red-500 bg-red-500 hover:bg-transparent w-full p-2 rounded-lg transition-colors duration-200"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
        {user.role === "admin" ? (
          <>
            <div className="admin_panel mt-5 mb-5 w-full flex justify-center items-center">
              <AdminPanel />
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="orders w-full mt-10 flex justify-center items-center">
          <div className="w-[98%] ring-1 ring-blue-500 rounded-lg p-2">
            <div className="w-full felx justify-center items-center text-center">
              <h1 className="text-2xl md:text-5xl uppercase">Orders</h1>
            </div>
            <div className="order_list w-full">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  {orders.length === 0 ? (
                    <p>No orders found</p>
                  ) : (
                    orders.map((order) => (
                      <OrderItems key={order._id} order={order} />
                    ))
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
