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
    //Get movies to display
    yield takeEvery('FETCH_MOVIES', getMovies);
    //Display movie genres
    yield takeEvery('SET_GENRES', displayGenres);
    //Edit a movie
    yield takeEvery('CHANGE_MOVIE', updateMovie);

}

//Create generator functions
function* getMovies() {
  const showMovie = yield Axios.get('/display');
  console.log("this saga came from display/GET bringing: ", showMovie.data);
  yield put({ type: 'SET_MOVIES', payload: showMovie.data });
}

function* displayGenres() {
  const genreList = yield Axios.get("/genre");
  console.log("this saga came from genre/GET bringing: ", genreList.data);
  yield put({ type: 'SET_GENRES', payload: genreList.data });
}

function* editMovie(action) {
  try {
    const response = yield Axios.get(`/display/${action.payload}`);
    yield put({ type: "CHANGE_MOVIE", payload: response.data });
  } catch (error) {
    console.log("error getting this change movie details", error);
  }
}

//Generator function POST request to server to update title and description in DB
function* updateMovie(action) {
  try {
    yield Axios.post('/movies', action.payload);
  } catch (error) {
    console.log("error updating movie information");
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
