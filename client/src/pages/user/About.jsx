import { assets } from "../../assets/assets_frontend/assets";

const About = () => {
  return (
    <div className="px-4 md:px-8 py-6">
      {/* Heading Section */}
      <p className="py-4 font-semibold text-3xl text-center text-gray-500 dark:text-gray-400 md:text-4xl">
        ABOUT <span className="text-gray-900 dark:text-white">US</span>
      </p>

      {/* About Section */}
      <div className="flex md:flex-row flex-col items-center gap-8 py-6">
        {/* Image */}
        <img
          className="rounded-lg w-full md:w-[360px] max-w-[400px]"
          src={assets.about_image}
          alt="About Us"
        />
        {/* Text Content */}
        <div className="flex flex-col gap-6 md:w-3/5">
          <p className="text-base text-gray-600 dark:text-gray-300 text-justify hover:text-gray-900 dark:hover:text-white leading-relaxed transition-colors">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs conveniently and efficiently. At Prescripto, we
            understand the challenges individuals face when it comes to
            scheduling doctor appointments and managing their health records.
          </p>
          <p className="text-base text-gray-600 dark:text-gray-300 text-justify hover:text-gray-900 dark:hover:text-white leading-relaxed transition-colors">
            {`            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to enhance our platform, integrating the latest
            advancements to improve user experience and deliver superior
            service. Whether you're booking your first appointment or managing
            ongoing care, Prescripto is here to support you every step of the
            way.`}
          </p>
          <b className="text-gray-900 dark:text-white text-lg">OUR VISION</b>
          <p className="text-base text-gray-600 dark:text-gray-300 text-justify hover:text-gray-900 dark:hover:text-white leading-relaxed transition-colors">
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap between patients
            and healthcare providers, making it easier for you to access the
            care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <p className="py-4 font-semibold text-3xl text-gray-500 dark:text-gray-400 text-start md:text-4xl">
        Why <span className="text-gray-900 dark:text-white">Choose Us</span>
      </p>

      {/* Features Grid */}
      <div className="gap-6 grid md:grid-cols-3">
        {/* Feature 1 */}
        <div className="flex flex-col justify-center gap-2 bg-gray-50 dark:bg-gray-800 shadow-md p-6 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors">
          <p className="font-semibold text-gray-900 dark:text-white text-lg">Efficiency</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col justify-center gap-2 bg-gray-50 dark:bg-gray-800 shadow-md p-6 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors">
          <p className="font-semibold text-gray-900 dark:text-white text-lg">Convenience</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col justify-center gap-2 bg-gray-50 dark:bg-gray-800 shadow-md p-6 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors">
          <p className="font-semibold text-gray-900 dark:text-white text-lg">Personalization</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
