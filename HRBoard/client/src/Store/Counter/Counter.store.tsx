import { createAction, createReducer } from "typesafe-actions";

export const INCREASE = "counter/INCREASE";
export const DECREASE = "counter/DECREASE";
export const INCREASE_BY = "counter/INCREASE_BY";

export const ASYNC_INCREASE = "counter/ASYNC_INCREASE";
export const ASYNC_DECREASE = "counter/ASYNC_DECREASE";

type CounterAction = ReturnType<typeof increase> | ReturnType<typeof decrease> | ReturnType<typeof increaseBy>;

export type CounterState = {
  number: number;
};

const initialState: CounterState = {
  number: 0,
};

const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: (state: CounterState) => {
    return { ...state, number: state.number + 1 };
  },
  [DECREASE]: (state: CounterState) => ({ ...state, number: state.number - 1 }),
  [INCREASE_BY]: (state: CounterState, action: any) => ({
    ...state,
    number: state.number + action.payload,
  }),
});

// export const increase = createAction(INCREASE)();

export const increase = () => ({
  type: INCREASE,
});

export const decrease = () => ({
  type: DECREASE,
});

// export const decrease = createAction(DECREASE)();
export const increaseBy = (payload: number) => ({
  type: INCREASE_BY,
  payload,
});

export const asyncIncrease = () => ({
  type: ASYNC_INCREASE,
});

export const asyncDecrease = () => ({
  type: ASYNC_DECREASE,
});

// export const asyncIncrease = createAction(ASYNC_INCREASE)();
// export const asyncDecrease = createAction(ASYNC_DECREASE)();

export default counter;
