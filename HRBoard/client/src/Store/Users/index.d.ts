import { REQ_GET_USERS, RES_GET_USERS } from "./Users.store";
import { User } from "../../Models/users";

export interface IUsersState {
  userList: User[] | [];
}

export interface IReqGetUsers {
  type: typeof REQ_GET_USERS;
  payload: {
    page: number;
    limit: number;
  };
}

interface IResGetUsers {
  type: typeof RES_GET_USERS;
  payload: {
    users: User[];
  };
}

export type UsersActionTypes = IResGetUsers;
