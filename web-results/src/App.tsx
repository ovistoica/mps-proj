import React from "react";
import "./App.css";
import { Api, ApiConfig } from "./services/api";
import CustomButton from "./components/custom-button/custom-button.component";

const App: React.FC = () => {
  let api: Api;
  const conf: ApiConfig = { url: "http://localhost:8000/api", timeout: 2000 };
  let err: boolean = false;
  React.useEffect(() => {
    api = new Api(conf);
    const login = async () => {
      const res = await api.login({
        username: "Neny",
        password: "Mancare10100."
      });
      if (res.kind === "ok") {
        api.setToken(res.token);
      } else {
        err = true;
      }
    };
    login();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>Public results of the contest</p>
        <CustomButton />
        {/* {!err && <a oncl} */}
      </header>
    </div>
  );
};

export default App;
