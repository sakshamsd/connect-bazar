import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import authReducer from "./reducer/auth.reducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const rootReducer = combineReducers({
	auth: authReducer,
});
const persistConfig = {
	key: "root",
	storage,
};

let middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
	const logger = createLogger();
	middleware = [...middleware, logger];
}

const store = createStore(
	persistReducer(persistConfig, rootReducer),
	applyMiddleware(...middleware)
);
const persistor = persistStore(store);
export { store, persistor };
