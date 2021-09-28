import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
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
          <ProtectedRoute exact path="/">
            <Header />
          </ProtectedRoute>
          <Route path="/admin">
            <div className="App">
              <Header />
              <Home />
            </div>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </Auth>
  );
}

export default App;
