import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
    const [progress, setProgress] = useState(10);
    return (
        <Router>
            <LoadingBar color="#f11946" progress={progress} />
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <News
                        key="general"
                        setProgress={setProgress}
                        country="India"
                        category="general"
                    />
                </Route>
                <Route exact path="/entertainment">
                    <News
                        key="entertainment"
                        setProgress={setProgress}
                        country="India"
                        category="entertainment"
                    />
                </Route>
                <Route exact path="/business">
                    <News
                        key="business"
                        setProgress={setProgress}
                        country="India"
                        category="business"
                    />
                </Route>
                <Route exact path="/sports">
                    <News
                        key="sports"
                        setProgress={setProgress}
                        country="India"
                        category="sports"
                    />
                </Route>
                <Route exact path="/health">
                    <News
                        key="health"
                        setProgress={setProgress}
                        country="India"
                        category="health"
                    />
                </Route>
                <Route exact path="/science">
                    <News
                        key="science"
                        setProgress={setProgress}
                        country="India"
                        category="science"
                    />
                </Route>
                <Route exact path="/technology">
                    <News
                        key="technology"
                        setProgress={setProgress}
                        country="India"
                        category="technology"
                    />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
