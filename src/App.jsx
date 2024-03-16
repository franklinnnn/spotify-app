import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { getUserToken } from "./util/spotify";
import MainProvider from "./MainContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  // const { token, setToken } = useContext(MainContext);

  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(getUserToken());
  }, []);

  return (
    <div className=" flex-col justify-center items-center w-full h-full  text-light text-bold">
      <div className="main">
        <div className="gradient" />
      </div>
      <BrowserRouter>
        <MainProvider>
          {token ? <HomePage setToken={setToken} /> : <LoginPage />}
        </MainProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
