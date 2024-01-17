import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import rootReducer from "./reducers";
import userSlice from "./reducres";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
// const rootReducer = (state, action) => {
//   if (action.type === "USER_LOGOUT") {
//     AsyncStorage.removeItem("persist:root");
//     return userSlice.reducer(undefined, action);
//   }

//   return userSlice.reducer(state, action);
// };
const persistedReducer = persistReducer(persistConfig, userSlice.reducer);
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
