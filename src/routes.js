import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout2 from './Layout2';
import Members from './Members';
import Profile from './Profile';

export default (
    <Route path="/" component={Layout2}>
        <IndexRoute component={Members} />
        <Route path="profiles" component={Profile} />
    </Route>
);