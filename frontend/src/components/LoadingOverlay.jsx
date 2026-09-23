const LoadingOverlay = ({ message = "Please wait..." }) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/75 px-6 backdrop-blur-sm">
      <div className="flex w-full max-w-sm flex-col items-center rounded-3xl border border-blue-400/20 bg-linear-to-br from-slate-900 via-blue-950 to-slate-900 px-8 py-10 text-center shadow-2xl shadow-blue-950/50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-400/30 border-t-cyan-300" />
        <p className="mt-5 text-lg font-semibold text-white">{message}</p>
        <p className="mt-1 text-sm text-slate-400">
          This will only take a moment.
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
