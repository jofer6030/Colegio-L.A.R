import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import { authReducer } from "./reducers/Auth";
import { usuariosReducer } from "./reducers/Usuarios";

const reducer = combineReducers({
  Auth: authReducer,
  Usuarios: usuariosReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
