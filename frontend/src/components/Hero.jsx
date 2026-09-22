import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative isolate min-h-170 w-full overflow-hidden bg-[#020b2b] md:min-h-180">
      <picture className="absolute inset-0 -z-20">
        <source media="(max-width: 767px)" srcSet="/HeroMobile.png" />
        <img
          src="/HeorDesktop.png"
          alt="A shopping cart filled with packages"
          className="h-full w-full object-cover object-center"
        />
      </picture>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,11,43,0.98)_0%,rgba(2,11,43,0.82)_34%,rgba(2,11,43,0.05)_72%),linear-gradient(0deg,rgba(2,11,43,0.55),transparent_35%)]" />

      <div className="mx-auto flex min-h-170 max-w-[1600px] items-center px-6 pb-20 pt-36 sm:px-10 md:min-h-180 md:px-16 lg:px-24">
        <div className="max-w-xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-orange-300">
            <span className="h-px w-8 bg-orange-300" />
            Picked for your everyday
          </p>
          <h1 className="max-w-lg text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-8xl">
            Good finds.
            <span className="block text-orange-400">Better days.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-slate-200 sm:text-lg">
            Practical things, thoughtful details, and little upgrades that make
            the everyday feel a bit more yours.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="rounded-full bg-orange-400 px-7 py-3 text-sm font-bold text-slate-950 transition-transform duration-200 hover:scale-105 hover:bg-orange-300"
            >
              Explore the shop <span aria-hidden="true">-&gt;</span>
            </Link>
            {/* <Link
              to="/about"
              className="rounded-full border border-white/35 px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
            >
              Our story
            </Link> */}
          </div>
        </div>

        <div className="absolute bottom-7 right-6 hidden items-center gap-3 rounded-2xl border border-white/15 bg-slate-950/50 px-4 py-3 backdrop-blur-md sm:flex md:right-12 lg:right-24">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 text-lg text-emerald-300">
            +
          </span>
          <div>
            <p className="text-sm font-bold text-white">Ready when you are</p>
            <p className="text-xs text-slate-300">Fresh picks, no fuss.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
