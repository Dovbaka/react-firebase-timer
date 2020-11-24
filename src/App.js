import styles from './App.module.css'
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import StopWatchPage from "./component/StopWatch/StopWatchContainer";
import { AuthProvider } from "./providers/AuthContext"
import Chart from "./component/StopWatch/Chart";
import GetStarted from "./component/GetStarted/GetStarted";

function App() {
  return (
      <div className={styles.app_wrapper}>
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route path={`/`} exact={true} render={() => <Login />} />
                    <Route path={`/register`} render={() => <Register />} />
                    <Route path={`/chart`} render={() => <Chart />} />
                    <Route path={`/stopwatch`} render={() => <StopWatchPage />} />
                    <Route path={`/getStarted`} render={() => <GetStarted />} />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
      </div>
  );
}

export default App;
