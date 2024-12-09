import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-white text-gray-800">
      <div className="flex flex-col gap-10 border-gray-300 sm:grid sm:grid-cols-[3fr_1fr_1fr] px-6 py-8 border-b">
        <div className="flex flex-col items-start gap-4">
          <img src={assets.logo} alt="Company Logo" className="w-44" />
          <p className="text-gray-600 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&aposs standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 mt-6 sm:mt-0">
          <p className="font-semibold text-gray-800 text-lg">COMPANY</p>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li
              onClick={() => {
                navigate("/");
                scrollTo(0, 0);
              }}
              className="hover:text-gray-900 cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/about");
                scrollTo(0, 0);
              }}
              className="hover:text-gray-900 cursor-pointer"
            >
              About Us
            </li>
            <li
              onClick={() => {
                navigate("/contact");
                scrollTo(0, 0);
              }}
              className="hover:text-gray-900 cursor-pointer"
            >
              Contact Us
            </li>
            <li className="hover:text-gray-900 cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-start gap-4 mt-6 sm:mt-0">
          <p className="font-semibold text-gray-800 text-lg">GET IN TOUCH</p>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-gray-900 cursor-pointer">
              +1-212-456-7890
            </li>
            <li className="hover:text-gray-900 cursor-pointer">
              greatstackdev@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <div className="py-4 text-center">
        <p className="text-base text-gray-900">
          Copyright © 2024 GreatStack - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
