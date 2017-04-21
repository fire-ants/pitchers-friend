
import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";

const RouterWithRedux = connect()(Router);

import reducers from './reducers';
import PlayerSearch from './containers/PlayerSearch';
import Player from './containers/Player';

const middleware = [thunk];
const store = compose(
  applyMiddleware(...middleware)
)(createStore)(reducers);

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="playerSearch"
              component={PlayerSearch}
              title="Player Search"
              hideNavBar={true}
              initial={true}
            />
            <Scene
              key="player"
              component={Player}
              title="Player"
            />
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}

export default App;
