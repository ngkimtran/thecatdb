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
    <div class='container'>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/cat/:id" component={SingleCat} />
        <Route path="*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
