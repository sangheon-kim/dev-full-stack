import { combineReducers } from "redux";
import Counter from "./Counter/Counter.store";
import Users from "./Users/Users.store";
import { all, fork } from "redux-saga/effects";

import { counterSaga } from "./Counter/Counter.saga";
import { usersSaga } from "./Users/Users.saga";

/** rootReducer */
export const rootReducer = combineReducers({
  Counter,
  Users,
});

/** ROOT Saga */
export function* rootSaga() {
  yield all([yield fork(counterSaga), yield fork(usersSaga)]);
}

export type RootState = ReturnType<typeof rootReducer>;
