import * as React from "react"
import ReactDOM from "react-dom";
import App from "./components/app/app";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer/reducer";
import {createAPI} from "./api";
import {Operation as DataOperation} from "./reducer/data/data";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducer/user/user";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(DataOperation.loadQuestions());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.querySelector(`#root`)
);
