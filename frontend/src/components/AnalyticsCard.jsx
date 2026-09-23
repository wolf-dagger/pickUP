const AnalyticsCard = ({ title, value }) => {
  return (
    <>
      <div className=" group relative overflow-hidden w-full min-h-40 md:min-h-52 lg:min-h-60 rounded-3xl border border-blue-500/20 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 p-6 shadow-lg shadow-blue-950/30 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/20 ">
        {" "}
        {/* Decorative glow */}{" "}
        <div className=" absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all duration-300 group-hover:bg-blue-400/20 " />{" "}
        <div className="relative flex h-full flex-col items-center justify-center gap-3">
          {" "}
          {/* Title */}{" "}
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-300">
            {" "}
            {title}{" "}
          </p>{" "}
          {/* Value */}{" "}
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            {" "}
            {value}{" "}
          </h2>{" "}
          {/* Bottom accent */}{" "}
          <div className="h-1 w-12 rounded-full bg-linear-to-r from-blue-500 to-cyan-400 transition-all duration-300 group-hover:w-20" />{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default AnalyticsCard;
