import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";

export class App extends Component {
    apiKey=process.env.REACT_APP_API_KEY;
    constructor(){
        super()
        this.state = {
            progress:10
        }
    }
    setProgress =(progress)=>{
        this.setState({progress:progress})
    }

    render() {
        return (
            <Router>
                <LoadingBar
                    color='#f11946'
                    progress={this.state.progress}
                    
                />

                <Navbar />
                <Switch>
                    <Route exact path="/"><News key="general" apiKey={this.apiKey} setProgress={this.setProgress}  country="India" category="general" /></Route>
                    <Route exact path="/entertainment"><News key="entertainment" apiKey={this.apiKey} setProgress={this.setProgress} country="India" category="entertainment" /></Route>
                    <Route exact path="/business"><News key="business" apiKey={this.apiKey} setProgress={this.setProgress} country="India" category="business" /></Route>
                    <Route exact path="/sports"><News key="sports" apiKey={this.apiKey} setProgress={this.setProgress} country="India" category="sports" /></Route>
                    <Route exact path="/health"><News key="health" apiKey={this.apiKey} setProgress={this.setProgress} country="India" category="health" /></Route>
                    <Route exact path="/science"><News key="science" apiKey={this.apiKey} setProgress={this.setProgress} country="India" category="science" /></Route>
                    <Route exact path="/technology"><News key="technology" apiKey={this.apiKey} setProgress={this.setProgress} country="India" category="technology" /></Route>
                </Switch>


            </Router>
        )
    }
}

export default App

