const OrderItems = ({ order }) => {
  return (
    <>
      <div className="order-item group relative mt-3 flex w-full flex-col gap-4 overflow-hidden rounded-3xl border border-blue-500/20 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 p-4 shadow-lg shadow-blue-950/20 transition-all duration-300 hover:border-blue-400/50 hover:shadow-blue-500/10 md:flex-row md:items-center md:justify-between md:p-5">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl transition-all duration-300 group-hover:bg-cyan-300/20" />
        <div className="order_image relative flex flex-col gap-2 text-sm md:text-base">
          <p className="break-all text-slate-400">
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
        <div className="relative self-start md:self-auto">
          <p
            className={`order_status ${order.status === "pending" ? "bg-orange-500/20 text-orange-300 ring-orange-400/40" : order.status === "shipped" ? "bg-blue-500/20 text-blue-300 ring-blue-400/40" : "bg-green-800/30 text-green-300 ring-green-400/40"} rounded-lg px-4 py-2 text-sm font-semibold uppercase ring-1`}
          >
            {order.status}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderItems;
