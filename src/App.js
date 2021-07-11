import './App.css'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Error from './pages/Error'
import SingleCat from './pages/SingleCat'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/thecatdb/" exact component={Home} />
        <Route path="/thecatdb/about" exact component={About} />
        <Route path="/thecatdb/cat/:id" component={SingleCat} />
        <Route path="*" component={Error} />
      </Switch>
    </Router>

  );
}

export default App;
