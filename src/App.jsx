import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { getUserToken } from "./util/spotify";
import "./App.css";

function App() {
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
        {token ? <Home setToken={setToken} /> : <Login />}
      </BrowserRouter>
    </div>
  );
}

export default App;
