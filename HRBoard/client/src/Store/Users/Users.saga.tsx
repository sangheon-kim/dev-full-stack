import { call, fork, all, takeEvery, take, takeLatest, takeLeading, put } from "redux-saga/effects";
import HTTPService, { IrequestParam } from "../../services/HTTPService";
import { REQ_GET_USERS, RES_GET_USERS } from "./Users.store";
import { ApiUrl } from "../../services/constants/api";
import { User } from "Models/users";
import { IReqGetUsers } from ".";

function genFunc<T>(cb: typeof HTTPService.request, param: Partial<IrequestParam>): typeof HTTPService.request {
  return () => cb<T>(param);
}

/********************************************************************************
 *  Generate Function
 ********************************************************************************/
function* reqGetAllUsersApi({ payload: data }: { payload: { page: number; limit: number } }) {
  const { page: _page, limit: _limit } = data;
  try {
    const params: Partial<IrequestParam> = {
      url: ApiUrl.users,
      data: { _page, _limit },
    };

    const requestFunc = genFunc<{ data: User[]; [key: string]: any }>(HTTPService.request, params);

    const { data }: { data: User[] } = yield call(requestFunc, params);
    yield put({
      type: RES_GET_USERS,
      payload: { users: data },
    });
  } catch (e) {
    console.error(e);
  }
}

/********************************************************************************
 *  watch
 ********************************************************************************/
export const usersSaga = function* () {
  yield all([yield takeLatest(REQ_GET_USERS as never, reqGetAllUsersApi)]);
};
