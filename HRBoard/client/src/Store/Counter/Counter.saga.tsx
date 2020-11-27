import { all, put, takeEvery, takeLatest, delay, takeLeading, take, call, fork, select } from "redux-saga/effects";
import { ASYNC_DECREASE, ASYNC_INCREASE, DECREASE, INCREASE } from "./Counter.store";

/********************************************************************************
 *  Generate Function
 ********************************************************************************/
function* asyncIncreaseGen() {
  // yield delay(3000);
  const number = yield select((state: any) => state.Counter.number);
  console.log(number);
  yield put({
    type: INCREASE,
  });
}

function* asyncDecreaseGen() {
  yield delay(3000);
  yield put({
    type: DECREASE,
  });
}

// export function* watchDecrease() {
//   while (true) {
//     yield take(ASYNC_DECREASE);
//     yield fork(asyncDecreaseGen);
//   }
// }

/********************************************************************************
 *  watch
 ********************************************************************************/
export const counterSaga = function* () {
  yield all([yield takeLatest(ASYNC_INCREASE as never, asyncIncreaseGen), yield takeEvery(ASYNC_DECREASE as never, asyncDecreaseGen)]);
};
