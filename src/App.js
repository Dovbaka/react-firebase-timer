import styles from './App.module.css'
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import StopWatchPage from "./component/StopWatch/StopWatchContainer";
import { AuthProvider } from "./providers/AuthContext"

function App() {
  return (
      <div className={styles.app_wrapper}>
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route path={`/`} exact={true} render={() => <Login />} />
                    <Route path={`/register`} render={() => <Register />} />
                    <Route path={`/stopwatch`} render={() => <StopWatchPage />} />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
      </div>
  );
}

export default App;
