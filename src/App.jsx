import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { getUserToken } from "./util/spotify";
import "./App.css";
import MainProvider, { MainContext } from "./MainContext";
import { useContext } from "react";

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
          {token ? <Home setToken={setToken} /> : <Login />}
        </MainProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
