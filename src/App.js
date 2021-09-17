import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import {
    BrowserRouter as Router,
    Switch,
    Route,

  } from "react-router-dom";

export class App extends Component {
    render() {
        return (
            <Router>
            
            <Navbar />
            <Switch>
                <Route exact path="/"><News  key="general"  country="India" category="general"/></Route>
                <Route exact path="/entertainment"><News  key="entertainment" country="India" category="entertainment"/></Route>
                <Route exact path="/business"><News key="business"  country="India" category="business"/></Route>
                <Route exact path="/sports"><News key="sports"  country="India" category="sports"/></Route>
                <Route exact path="/health"><News key="health"  country="India" category="health"/></Route>
                <Route exact path="/science"><News key="science"  country="India" category="science"/></Route>
                <Route exact path="/technology"><News key="technology"  country="India" category="technology"/></Route>
            </Switch>
            
                
            </Router>
        )
    }
}

export default App

