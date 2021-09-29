import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MojaStranica from "./pages/MojaStranica";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Auth, useAuth } from "./components/Auth/auth";
import Register from "./pages/Register";

function ProtectedRoute({ children, rest }) {
  const auth = useAuth();

  if (auth.loading) {
    return <h1>Loading user...</h1>;
  }

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth.currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

function App() {
  return (
    <Auth>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
          </Route>
          <ProtectedRoute path="/admin">
            <div className="App">
              <Header />
              <Home />
            </div>
          </ProtectedRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/moja-stranica">
            <MojaStranica />
          </Route>
        </Switch>
      </Router>
    </Auth>
  );
}

export default App;
