import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import companyProfileReducer from './company-profile-reducer';
import formReducer from './form-reducer';
import carsReducer from './car-reducer';

let rootReducer = combineReducers({
    companyProfile: companyProfileReducer,
    formData: formReducer,
    cars: carsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));

export default store;

