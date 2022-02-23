import { Redirect, Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import About from './pages/About';
import Error from './pages/Error';
import Posts from './pages/Posts';
import './styles/App.css';
import Navbar from './UI/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/posts">
          <Posts/>
        </Route>
        <Route path="/error">
          <Error/>
        </Route>
        <Redirect to="/error" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

//https://youtu.be/GNrdg3PzpJQ?t=7583