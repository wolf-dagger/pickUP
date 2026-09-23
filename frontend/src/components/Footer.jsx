import { Link } from "react-router-dom";
import About from "../pages/About";

const Footer = () => {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-blue-400/15 bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 text-slate-400">
      <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1600px] px-6 py-12 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link
              to="/"
              className="inline-block transition-transform duration-300 hover:scale-[1.03]"
            >
              <img src="/pickUPDark.svg" alt="pickUP" className="h-10 w-auto" />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Thoughtful finds, clear details, and a simpler way to bring good
              things home.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
              Explore
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              <li>
                <Link
                  to="/about"
                  element={<About />}
                  className="transition-colors duration-200 hover:text-cyan-300"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="transition-colors duration-200 hover:text-cyan-300"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="transition-colors duration-200 hover:text-cyan-300"
                >
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="transition-colors duration-200 hover:text-cyan-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-blue-400/15 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-slate-200">pickUP</span>. All
            rights reserved.
          </p>

          <p className="text-slate-500">Built with React and care</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
