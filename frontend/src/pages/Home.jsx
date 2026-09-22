import Hero from "../components/Hero";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <section className="mx-auto grid max-w-[1600px] grid-cols-1 gap-px border-x border-b border-slate-800 bg-slate-800 sm:grid-cols-3">
        <div className="bg-[#071333] px-6 py-7 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
            01 / Curated
          </p>
          <h2 className="mt-3 text-xl font-bold text-white">
            Less scrolling, more finding.
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            A considered mix of useful things worth bringing home.
          </p>
        </div>
        <div className="bg-[#071333] px-6 py-7 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-300">
            02 / Simple
          </p>
          <h2 className="mt-3 text-xl font-bold text-white">
            Shopping without the noise.
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Clear details, honest prices, and a checkout that gets out of your
            way.
          </p>
        </div>
        <div className="bg-[#071333] px-6 py-7 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
            03 / Yours
          </p>
          <h2 className="mt-3 text-xl font-bold text-white">
            Find your next favorite.
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Build a cart around the little upgrades that fit your life.
          </p>
        </div>
      </section>
      <section className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-6 px-6 py-16 sm:px-10 md:flex-row md:items-end md:px-16 lg:px-24">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-cyan-400">
            Start somewhere good
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-black text-white sm:text-4xl">
            Your next useful thing is probably closer than you think.
          </h2>
        </div>
        <Link
          to="/shop"
          className="shrink-0 border-b border-orange-400 pb-2 text-sm font-bold text-orange-300 transition-colors hover:text-orange-200"
        >
          See everything <span aria-hidden="true">-&gt;</span>
        </Link>
      </section>
      <div className="h-16 bg-[linear-gradient(90deg,#071333,#0b2360,#071333)]" />
    </main>
  );
};

export default Home;

//
