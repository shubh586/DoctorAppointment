import { assets } from "../../assets/assets_admin/assets";
import { NavLink } from "react-router-dom";

const Contact = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-8 my-6 p-6">
      <img
        className="shadow-lg rounded-lg w-full max-w-sm"
        src={assets.contact_image}
        alt="Doctor and patient"
      />

      <div className="flex flex-col gap-6 w-full max-w-md">
        <h2 className="font-semibold text-2xl text-gray-800 md:text-3xl uppercase">
          Contact <span className="text-gray-900">Us</span>
        </h2>

        <div>
          <h3 className="mb-2 font-semibold text-gray-700 text-lg md:text-xl">
            Our Office
          </h3>
          <p className="text-base text-gray-600 leading-relaxed">
            54709 Willms Station <br />
            Suite 350, Washington, USA <br />
            Tel: (415) 555-0132 <br />
            Email: greatstackdev@gmail.com
          </p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-700 text-lg md:text-xl">
            Careers at Prescripto
          </h3>
          <p className="text-base text-gray-600 leading-relaxed">
            Learn more about our teams and job openings.
          </p>
          <NavLink
            to="/careers"
            className="inline-block border-2 border-gray-700 hover:bg-gray-700 mt-3 px-6 py-2 rounded-md font-semibold text-base text-gray-700 hover:text-white transition-colors duration-300"
          >
            Explore Jobs
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Contact;
