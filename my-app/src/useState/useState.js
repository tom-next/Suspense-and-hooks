/*
const Counter = props => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};
*/
//目的: 每次 setState 后，重新运行函数，获得最新状态，并用新的状态渲染组件。
import {wrapTask} from '../callbackRunner/index'

export const useState = initial => {
  let task = callback => {
    let initialValue = [
      initial,
      function setState(newState) {
        // 调用之后, 需要同步到缓存结果，同时刷新当前结果
        // 这里 callback 对应 runner 中的 cb
        callback([newState, setState]);
      }
    ]
    return callback(initialValue)
  }

  return wrapTask(task)
}

// wraptask 用来检测当前runner有没有值
// 没有就返回 task

