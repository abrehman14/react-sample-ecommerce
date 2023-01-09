import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartReducer from './CartHandler/CartSlice'
import counterReducer from './itemcounter/CounterSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const reducer = combineReducers({
  cart: cartReducer,
  counter: counterReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
})
