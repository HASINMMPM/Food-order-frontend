import { Outlet } from "react-router-dom";
import Header from "./Components/commen/Header";
import FooterComponent from "./Components/commen/Footer";

import LoginPage from "./Components/commen/LoginPage";
import { useContext } from "react";
import { ContextList } from "./Components/commen/ContextListProvider";

function App() {
  const {loginPage}= useContext (ContextList)
  

  return (
    <main className="px-4">
      {loginPage ? <LoginPage /> : <></>}
      <div className="container mx-auto bg-white">
        <Header  />
        <Outlet  />
        <FooterComponent />
      </div>
    </main>
  );
}

export default App;


