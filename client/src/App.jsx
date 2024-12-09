import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import AppContextProvider from "./context/AppContextProvider";

const App = () => {
  return (
    <AppContextProvider>
      <div className="mx-4 sm:mx-[10%]">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </AppContextProvider>
  );
};

export default App;
