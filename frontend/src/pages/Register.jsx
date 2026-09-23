import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(
          "User registered successfully. Please check your email for verification OTP.",
        );
        login(data.user);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <>
        <div className="w-full mt-35">
          <h1 className="text-3xl md:text-5xl uppercase font-bold bg-linear-to-r from-blue-400 via-blue-600 to-indigo-800 bg-clip-text text-transparent text-center mb-10">
            REGISTER
          </h1>
        </div>
        <div className="flex justify-center align-middle h-full">
          <div className="flex flex-col rounded-xl border-2 border-blue-500 max-sm:w-[95%] w-[30%] h-135 mx-auto justify-center items-center m-auto">
            <form
              className="w-[90%] mx-auto flex flex-col gap-5 "
              onSubmit={handleSubmit}
            >
              <div className="w-full mb-5 flexgap">
                <label
                  for="name"
                  className="block mb-2.5 max-sm:text-sm text-xl font-medium text-heading"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  className="inputdesigne"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="w-full mb-5 flexgap">
                <label
                  for="email"
                  className="block mb-2.5 max-sm:text-sm text-xl font-medium text-heading"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="inputdesigne"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="mb-5 flexgap">
                <label
                  for="password"
                  className="block mb-2.5 max-sm:text-sm text-xl font-medium text-heading"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="inputdesigne"
                  placeholder="••••••••"
                  required
                />
              </div>
              <label for="remember" className="flex items-center mb-5 gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="inputdesigne"
                  required
                />
                <p className="ms-2 text-sm font-medium text-heading select-none">
                  I agree with the{" "}
                  <a href="#" className="text-fg-brand hover:underline">
                    terms and conditions
                  </a>
                  .
                </p>
              </label>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="text-white bg-brand box-border border font-medium leading-5 rounded-base text-sm px-2 py-2 border-blue-500
              w-80 hover:bg-blue-600 transition-colors duration-300 ease-in-out rounded-lg  cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="h-10"></div>
        <div className="space-y-5 flex flex-col items-center">
          <p className="text-sm font-medium text-heading">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-fg-brand hover:underline text-blue-500 md:text-2xl font-mono tracking-tighter cursor-pointer"
            >
              Log In
            </Link>
          </p>
        </div>
        <div className="h-20"></div>
      </>
    </>
  );
};

export default Register;
