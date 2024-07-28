import { Outlet } from "react-router-dom";
import Header from "./Components/commen/Header";
import FooterComponent from "./Components/commen/Footer";


function App() {


  return (
    <body className="bg-white h-screen">
    <div className="container mx-auto bg-white">
    <Header/>
    <Outlet/>
    <FooterComponent/>
    </div>
    </body>
  );
}

export default App;
