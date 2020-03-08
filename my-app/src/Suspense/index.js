import React from 'react';
import {runner, wrapTask} from './runner'

const withAsync = fun => {
    class AsyncComponent extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                component: null
            }
            runner(() => {
                let component = fun(props)
                this.setState({
                    component,
                })
            })
        }

        render() {
            return this.state.component
        }
    }
    return AsyncComponent
}

const task1 = () =>
  wrapTask(new Promise(resolve => setTimeout(() => resolve("task1"), 1000)));

const task2 = () =>
  wrapTask(new Promise(resolve => setTimeout(() => resolve("task2"), 1000)));

const task3 = () =>
  wrapTask(new Promise(resolve => setTimeout(() => resolve("task3"), 4000)));

const task4 = () =>
  wrapTask(new Promise(resolve => setTimeout(() => resolve("task4"), 5000)));


const App1 = withAsync(() => {
  const ret1 = task1();
  const ret2 = task2();
  return (
    <ul>
      <li>{ret1}</li>
      <li>{ret2}</li>
    </ul>
  );
});


const App2 = withAsync(() => {
    const ret3 = task3();
    const ret4 = task4();
    return (
      <ul>
        <li>{ret3}</li>
        <li>{ret4}</li>
      </ul>
    );
});


export {
    App1,
    App2
}