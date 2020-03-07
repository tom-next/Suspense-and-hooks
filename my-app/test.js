// 目的: 1. 当遇到异步副作用时，流程暂停，等待任务完成。当任务完成时候，继续执行流程
let pos = 0

let cache = []

const task1 = () => {
    return wrapTask(new Promise(resovle => setTimeout(() => {
        resovle('task1')
    }, 1000)))
}

const task2 = () => {
    return wrapTask(new Promise(resovle => setTimeout(() => {
        resovle('task2')
    }, 1000)))
}

// 异步任务包一层，用来控制任务是否进入暂态
const wrapTask = (task) => {
    if(cache[pos]) {
        return cache[pos++]
    }
    throw task
}

// ruuner 
const runner = (process) => {
    cache = []
    function step() {
        pos = 0
        try {
            const ret = process()
            return ret
        } catch(task) {
            return task.then((value) => {
                cache[pos] = value
                return step()
            })
        }
    }
    return step()
}


const main = () => {
    const ret1 = task1()
    const ret2 = task2()
    console.log("result is", ret1, ret2)
}

runner(main)