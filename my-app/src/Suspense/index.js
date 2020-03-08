import React from 'react';
import {wrapTask} from '../runner/index'
import withAsync from './withAsync'


const task1 = () =>
  wrapTask(new Promise(resolve => setTimeout(() => resolve("task1"), 1000)));

const task2 = () =>
  wrapTask(new Promise(resolve => setTimeout(() => resolve("task2"), 1000)));

const task3 = () =>
  wrapTask(new Promise(resolve => setTimeout(() => resolve("task3"), 4000)));

const task4 = () =>
  wrapTask(new Promise(resolve => setTimeout(() => resolve("task4"), 5000)));


export const App1 = withAsync(() => {
  const ret1 = task1();
  const ret2 = task2();
  return (
    <ul>
      <li>{ret1}</li>
      <li>{ret2}</li>
    </ul>
  );
});


export const App2 = withAsync(() => {
    const ret3 = task3();
    const ret4 = task4();
    return (
      <ul>
        <li>{ret3}</li>
        <li>{ret4}</li>
      </ul>
    );
});