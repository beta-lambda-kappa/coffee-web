import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import About from './components/About';

export default function getRoutes() {
  return (
    <Route path="/" component={App}>
      <Route path="about" component={About}/>
    </Route>
  );
}
