import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import Courses from './components/Courses';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <PrivateRoute path="/courses" component={Courses} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
