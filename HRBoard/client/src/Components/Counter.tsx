import React from "react";
import { connect } from "react-redux";
import { asyncDecrease, asyncIncrease, CounterState, decrease, increase } from "../Store/Counter/Counter.store";
interface ICounter {
  number: number;
  increase: () => void;
  decrease: () => void;
  asyncIncrease: () => void;
  asyncDecrease: () => void;
}

const Counter: React.FC<Partial<ICounter>> = ({ number, increase, decrease, asyncIncrease, asyncDecrease }) => {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <button onClick={increase}>+1</button>
        <button onClick={decrease}>-1</button>

        <button onClick={asyncIncrease}>async +1</button>
        <button onClick={asyncDecrease}>async -1</button>
      </div>
    </div>
  );
};

export default connect(
  ({ Counter }: { Counter: CounterState }) => ({
    number: Counter.number,
  }),
  {
    increase,
    decrease,
    asyncIncrease,
    asyncDecrease,
  }
)(Counter);
