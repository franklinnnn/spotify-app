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
    <div className="flex flex-col justify-center items-center w-full h-full  text-white text-bold">
      <BrowserRouter>
        {token ? <Home setToken={setToken} /> : <Login />}
      </BrowserRouter>
    </div>
  );
}

export default App;
