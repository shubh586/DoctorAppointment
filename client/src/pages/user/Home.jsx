import Banner from "../../Components/Banner";

import Header from "../../Components/Header";
import Speciality from "../../Components/Speciality";
import TopDoctors from "../../Components/TopDoctors";

const Home = () => {
  return (
    <div>
      <Header></Header>
      <Speciality />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
