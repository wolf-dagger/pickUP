import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authContext";
import AnalyticsCard from "../components/AnalyticsCard";

const Analytics = () => {
  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`/api/analytics`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch analytics");
        }

        const data = await res.json();
        console.log(data);
        setInfo(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchInfo();
  }, [user?.token]);

  return (
    <>
      <div className="w-full mt-30 md:mt-40 mb-10">
        <h1 className="text-3xl md:text-5xl uppercase font-bold bg-linear-to-r from-blue-400 via-blue-600 to-indigo-800 bg-clip-text text-transparent text-center">
          Analytics
        </h1>
        <div className="w-full flex justify-center items-center mt-10">
          <div className="w-[98%] md:w-[85%] lg:w-[75%] bg-blue-950 rounded-lg p-2 md:p-4">
            <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2">
              <AnalyticsCard title="Total Orders" value={info.totalOrders} />

              <AnalyticsCard title="Total Sales" value={info.totalRevenue} />

              <AnalyticsCard title="Products" value={info.totalProducts} />

              <AnalyticsCard title="Customers" value={info.totalUsers} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
