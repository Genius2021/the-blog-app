import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/Home"
import Write from "./pages/Write"
import Post from "./pages/Post"
import Contact from "./pages/Contact"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (
    <div>
      <Router>
        <div className="app">
        <nav className="nav">
         <Navbar />
        </nav>
        <Switch>
        <main className="main">
          <Route exact path="/" component={Home} />
          <Route path="/write" component={Write} />
          <Route path="/posts/:id" component={Post} />
          <Route path="/contact" component={Contact} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/Register" component={Register} />
        </main>
        </Switch>
        <footer className="footer">&copy; 2021 Emmanuel Onwuka Azu</footer>
        </div>
      </Router>
      </div>
  );
}

export default App;
