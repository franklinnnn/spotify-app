import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { getUserToken } from "./util/spotify";

function App() {
  const [token, setToken] = useState("");
  useEffect(() => {
    setToken(getUserToken());
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full  text-white text-bold">
      {!token ? <Login /> : <Home setToken={setToken} token={token} />}
    </div>
  );
}

export default App;
