import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

function App() {
  return (
    <main>
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
}

export default App;
