import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./components/Login";
import Courses from "./components/Courses";

const App = () => {
    return (
        <Router>
            <div>
                <h1>Welcome to Your App</h1>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/courses" component={Courses} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
