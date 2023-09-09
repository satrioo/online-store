import {configureStore} from '@reduxjs/toolkit';
import rootReducers from './reducer/handleCart';
const store = configureStore({
    reducer: rootReducers,

})

export default store;
