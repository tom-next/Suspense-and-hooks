// 目的: 1. 当遇到异步副作用时，流程暂停，等待任务完成。当任务完成时候，继续执行流程
let pos = 0

const cache = []

const task1 = () => {
    if(cache[pos]) {
        // pos + 1 下一位, 同时返回当前值
        return cache[pos++]
    }else {
        throw new Promise(resovle => setTimeout(() => {
            resovle('task1')
        }, 1000))
    }
}

const task2 = () => {
    if(cache[pos]) {
        // pos + 1 下一位, 同时返回当前值
        return cache[pos++]
    }else {
        throw new Promise(resovle => setTimeout(() => {
            resovle('task2')
        }, 1000))
    }
}

const main = () => {
    const step = () => {
        pos = 0
        try {
            let ret1 = task1()
            let ret2 = task2()
            console.log("result", ret1, ret2)
        } catch (task) {
            task.then((value) => {
                cache[pos++] = value
                // 重启流程
                return step()
            })
        }
    }
    return step()
}

main()