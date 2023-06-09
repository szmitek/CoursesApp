import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Courses from './components/Courses';
import SingleCourse from './components/SingleCourse';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <PrivateRoute exact path="/courses" component={Courses} />
                    <PrivateRoute path="/courses/:id" component={SingleCourse} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
