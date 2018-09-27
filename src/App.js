import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';
import DressMe from './components/DressMe/DressMe';
import ManageGarments from './components/ManageGarments/ManageGarments';
import MixNMatch from './components/MixNMatch/MixNMatch';
import NewGarment from './components/NewGarment/NewGarment';
import OutfitGallery from './components/OutfitGallery/OutfitGallery';

import './styles/main.css';

const App = () => (
  <div>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
        <Route
          path="/dressMe"
          component={DressMe}
        />
        <Route
          path="/manageGarments"
          component={ManageGarments}
        />
        <Route
          path="/mixNMatch"
          component={MixNMatch}
        />
        <Route
          path="/newGarment"
          component={NewGarment}
        />
        <Route
          path="/outfitGallery"
          component={OutfitGallery}
        />

        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
