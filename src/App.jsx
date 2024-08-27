import { Outlet } from "react-router-dom";
import Header from "./Components/commen/Header";
import FooterComponent from "./Components/commen/Footer";
import { useState } from "react";
import LoginPage from "./Components/commen/LoginPage";

function App() {
  const [loginPage, setLoginPage] = useState(false);

  return (
    <main className="px-4">
      {loginPage ? <LoginPage setLoginPage={setLoginPage} /> : <></>}
      <div className="container mx-auto bg-white">
        <Header setLoginPage={setLoginPage} />
        <Outlet />
        <FooterComponent />
      </div>
    </main>
  );
}

export default App;
