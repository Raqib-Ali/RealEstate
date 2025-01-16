import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.jsx'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 


const rootReducer = combineReducers({user: userReducer})

const configReducer = {
   key: 'root',
   storage,
   version: 1
}

const persistedReducer = persistReducer(configReducer, rootReducer)


 const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
   getDefaultMiddleware({
      serializableCheck: false,
   }),
  
});

export default store;
export const persistor = persistStore(store); 