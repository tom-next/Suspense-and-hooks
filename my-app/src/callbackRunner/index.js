// 目的: 1. 当遇到异步副作用时，流程暂停，等待任务完成。当任务完成时候，继续执行流程

// 当前的流程上下文
let context = {}

// const task1 = () => {
//     return wrapTask(new Promise(resovle => setTimeout(() => {
//         resovle('task1')
//     }, 1000)))
// }

// const task2 = () => {
//     return wrapTask(new Promise(resovle => setTimeout(() => {
//         resovle('task2')
//     }, 1000)))
// }

export const wrapTask = task => {
    // 每次运行 task，如果 task 已经被缓存，则返回, 在 react中由于setState是同步的，因此 task是一个函数
    // 并更新
    if (context.cache[context.pos]) {
      return context.cache[context.pos++]
    }
    throw task
}

// ruuner 
export default (process) => {
     // 为每个流程设置自己的上下文
    const ctx = {
        cache: [],
        pos: 0,
    }

    function step() {
        ctx.pos = 0
        // 缓存当前上下文，执行完成后恢复
        const cachedContext = context
        // 将上下文绑定到当前的流程的上下文
        context = ctx
        try {
            const ret = process()
            return ret
        } catch(task) {
            const pos = ctx.pos
            // 这里的 value 就是 useState 中的 initialValue
            let cb = (value) => {
                ctx.cache[pos] = value
                return step()
            }
            return task(cb)
        }finally {
            // 每次执行完，释放对上下文的掌控
            context = cachedContext
        }
    }
    return step()
}


// const main = () => {
//     const ret1 = task1()
//     const ret2 = task2()
//     console.log("result is", ret1, ret2)
// }
// runner(main)