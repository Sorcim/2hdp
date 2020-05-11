import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {fetchMyData} from "./components/Movie/MovieAction";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MovieSearch from "./components/Movie/MovieSearch";
import MovieDetail from "./components/Movie/MovieDetail";
import LikeList from "./components/Movie/LikeList";
import MovieRandom from "./components/Movie/MovieRandom";
import Nav from "./components/Nav/Nav";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute";

const initState = {
  dataLoad: false,
  movies: [],
  search: '',
  user: false
};

function reducerApp(state = initState, action) {
  const {type, payload} = action;
  if (type === "REFRESH") {
    return {...state, dataLoad: true, movies: payload};
  }
  if (type === "SEARCH") {
    return {...state, search: payload};
  }
  if (type === "LOGIN") {
    return {...state, user: payload};
  }
  if (type === "LOGOUT") {
    return {...state, user: payload};
  }
  return state;
}

const store = createStore(reducerApp, applyMiddleware(thunk));
fetchMyData(store.dispatch);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Nav/>
      <PrivateRoute path="/search/:query" component={MovieSearch}/>
      <PrivateRoute path="/movie/:idMovie" component={MovieDetail}/>
      <PrivateRoute path="/randomize" component={MovieRandom}/>
      <PrivateRoute path="/like" component={LikeList}/>
      <Route path="/login" component={Login}/>
      <PrivateRoute exact path="/" component={App}/>
    </Router>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
