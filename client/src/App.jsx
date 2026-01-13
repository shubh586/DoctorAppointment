import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import AppContextProvider from "./context/AppContextProvider";

const App = () => {
  return (
    <AppContextProvider>
      <div className="flex flex-col min-h-screen mx-4 sm:mx-[10%]">
        <NavBar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AppContextProvider>
  );
};

export default App;
