import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10 xl:px-16 2xl:px-24">
        {/* Main Footer */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Logo & Description */}
          <div>
            <Link to="/" className="inline-block">
              <img src="/pickUPDark.svg" alt="pickUP" className="h-10 w-auto" />
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
              Your simple and reliable destination for shopping online.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <li>
                <Link
                  to="/shop"
                  className="transition-colors duration-200 hover:text-orange-400"
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="transition-colors duration-200 hover:text-orange-400"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="transition-colors duration-200 hover:text-orange-400"
                >
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="transition-colors duration-200 hover:text-orange-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-gray-300">pickUP</span>. All
            rights reserved.
          </p>

          <p className="text-gray-600">Built with React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
