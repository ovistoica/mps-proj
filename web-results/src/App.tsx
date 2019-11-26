import React from "react";
import "./App.css";
import { Api, ApiConfig } from "./services/api";
import CustomButton from "./components/custom-button/custom-button.component";
import { color, spacing } from "./theme";
import { ContestantResultSnapshot } from "./models/contestant-result";

const CONTAINER = {
  height: 150,
  flex: 1,
  backgroundColor: color.top,
  margin: spacing[3],
  alignItems: "flex-start",
  elevation: 2
};

const PARTICIPANT = {
  color: color.primary,
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center"
};

const ICON_CONTAINER = {
  margin: 10
};

const CARD_TITLE = {
  flexDirection: "row",
  width: "100%",
  justifyContent: "flex-start",
  alignItems: "center"
};

const App: React.FC = () => {
  let api: Api;
  const conf: ApiConfig = { url: "http://localhost:8000/api", timeout: 2000 };

  const [err, setErr] = React.useState<boolean>(false);
  const [data, setData] = React.useState<
    ContestantResultSnapshot[] | undefined
  >(undefined);
  React.useEffect(() => {
    api = new Api(conf);
    api.setup();
    console.log("HAS BEEN SET UP", api);
    const login = async () => {
      const res = await api.login({
        username: "Neny",
        password: "Mancare10100."
      });
      if (res.kind === "ok") {
        api.setToken(res.token);
      } else {
        setErr(true);
      }
    };
    login();
  }, []);

  const onButtonClick = () => {
    api.getContestResults(30).then(res => {
      if (res.kind !== "ok") {
        setErr(true);
      } else {
        setData(res.results);
      }
    });
  };

  return (
    <div className="App" style={{ backgroundColor: color.background }}>
      <header className="App-header">
        <p>Public results of the contest</p>
        <CustomButton onClick={onButtonClick}>
          <p style={{ alignItems: "center" }}>Get Results</p>
        </CustomButton>
        {!err &&
          data &&
          data.map(result => (
            <div
              style={{
                height: 150,
                flex: 1,
                backgroundColor: color.top,
                margin: spacing[3],
                alignItems: "flex-start"
              }}
            >
              <p>{result.firstName}</p>
            </div>
          ))}
      </header>
    </div>
  );
};

export default App;
