import {
  Switch,
  Route,
    Redirect
} from "react-router-dom";
import {Auth, Home} from "./pages";

function App() {
    return (
        <div className="app">
            <Switch>
                <Route
                    exact
                    path={["/signin", "/signup"]}
                    render={() => <Auth/>}
                />
                <Route
                    exact
                    path="/home"
                    render={() => <Home/>}
                />
                <Redirect from='/' to='/signin'/>
            </Switch>
        </div>
    );
}

export default App;
