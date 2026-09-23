import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 pb-12 pt-28 text-white md:px-8 md:pt-32">
      <div className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-blue-500/20 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 shadow-2xl shadow-blue-950/40 md:flex-row">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative flex min-h-72 w-full items-center justify-center border-b border-blue-400/10 p-6 md:min-h-120 md:w-1/2 md:border-b-0 md:border-r md:p-10 rounded-xl">
          <img
            src="/orderSuccess.png"
            alt="Order Success"
            className="h-full max-h-80 w-full object-contain drop-shadow-2xl md:max-h-120 rounded-xl"
          />
        </div>
        <div className="relative flex w-full flex-col items-center justify-center gap-6 p-8 text-center md:w-1/2 md:gap-8 md:p-12">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/40 bg-emerald-400/10 text-2xl text-emerald-300 shadow-lg shadow-emerald-950/40">
            ✓
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">
            Payment confirmed
          </p>
          <h1 className="text-2xl font-bold leading-tight text-white md:text-5xl">
            ORDER PLACED SUCCESSFULLY
          </h1>
          <p className="text-base uppercase tracking-[0.2em] text-slate-400 md:text-lg">
            Thank you for shopping with pickUP
          </p>
          <Link to="/shop" className="mt-2 w-full max-w-xs">
            <button className="w-full cursor-pointer rounded-lg border border-emerald-400/70 bg-emerald-500/10 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-emerald-200 transition-colors duration-300 ease-in-out hover:bg-emerald-600 hover:text-white">
              Back to Shop
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
