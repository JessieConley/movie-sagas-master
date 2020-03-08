import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from "redux-saga/effects";
import Axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', getMovies);
    yield takeEvery('SET_GENRES', getGenresToDisplay);
    yield takeEvery('CHANGE_FLICK', editMovies);

}

//Create generator functions
function* getMovies() {
  const showMovie = yield Axios.get('/display');
  console.log("this saga came from display/GET bringing: ", showMovie.data);
  yield put({ type: 'SET_MOVIES', payload: showMovie.data });
}

function* getGenresToDisplay() {
  const genreList = yield Axios.get("/genre");
  console.log("this saga came from genre/GET bringing: ", genreList.data);
  yield put({ type: 'SET_GENRES', payload: genreList.data });
}

function* editMovies(edit) {
  console.log("in saga PUT with: ", edit.payload.sendId);
  try {
    yield Axios.put(`/display/${edit.payload.sendId}`, edit.payload);
    yield put({ type: 'CHANGE_FLICK' });
  } catch (error) {
    console.log(error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
