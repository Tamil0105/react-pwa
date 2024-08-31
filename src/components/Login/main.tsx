import React, { useState, FormEvent } from "react";
import { BsEye } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface Errors {
  phoneNumber?: string;
  password?: string;
}

const LoginCard: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false); // New state for password visibility
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: Errors = {};
    const phoneRegex = /^\d{10}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber.replace(/\s+/g, ''))) {
      console.log(phoneNumber,phoneRegex.test(phoneNumber))
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: FormEvent): void => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted");
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img
            src="https://via.placeholder.com/150" // Replace with your logo URL
            alt="Logo"
            className="h-16 w-16"
          />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-primary text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline ${
                errors.phoneNumber ? "border-red-500" : ""
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.phoneNumber}
              </p>
            )}
          </div>
          <div className="mb-2 relative">
            <label className="block text-primary text-sm font-bold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`shadow relative appearance-none border rounded w-full py-2 px-3 text-primary leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-0 pr-3 flex items-center text-sm leading-5 ${
                errors.password ? "top-7 md:top-7" : "top-7 md:top-7"
              }`}
            >
              {showPassword ? (
                <BsEye className="h-5 w-5 text-primary" />
              ) : (
                <FiEyeOff className="h-5 w-5 text-primary" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <a
            href="#"
            className=" justify-end flex pb-2 underline text-sm text-primary hover:text-secondary"
          >
            Forgot Password?
          </a>
          <div className="flex flex-col w-full items-center justify-center mb-6">
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline mb-3"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
