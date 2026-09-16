const OrderItems = ({ order }) => {
  return (
    <>
      <div className="order-item w-full mt-2 ring-1 ring-slate-200 p-2 flex justify-between items-center">
        <div className="order_image">
          <p className="text-slate-400">
            Order Id: <span className="text-white">{order._id}</span>
          </p>
          <p className="text-slate-400">
            Date of order: <span className="text-white">{order.createdAt}</span>
          </p>
          <p className="text-slate-400">
            Total Amount:{" "}
            <span className="text-white">{order.totalAmount}</span>
          </p>
        </div>
        <div>
          <p
            className={`order_status ${order.status === "pending" ? "bg-orange-500" : order.status === "shipped" ? "bg-blue-500" : "bg-green-800"} px-4 py-2 rounded-lg uppercase`}
          >
            {order.status}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderItems;
