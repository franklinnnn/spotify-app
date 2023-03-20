import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((element) => element.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full  text-white text-bold">
      {!token ? <Login /> : <Home setToken={setToken} token={token} />}
    </div>
  );
}

export default App;
