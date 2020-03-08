// 当前的流程上下文
let context = {};

export const wrapTask = task => {
  // 每次运行 task，如果 task 已经被缓存，则返回
  // 并更新
  if (context.cache[context.pos]) {
    return context.cache[context.pos++];
  }
  throw task;
};

export const runner = process => {
  // 为每个流程设置自己的上下文
  const ctx = {
    cache: [],
    pos: 0
  }

  return step()

  function step() {
    // 每次流程执行，重置当前步骤到开头
    ctx.pos = 0
    // 缓存当前上下文，执行完成后恢复
    const cachedContext = context;
    // 将上下文绑定到当前的流程的上下文
    context = ctx;

    try {
      return process();
    } catch (task) {
      // 记录任务进入暂态时的位置，便于后面知道刷新哪个位置的缓存
      const pos = ctx.pos;
      return task.then(value => {
        // 缓存当前执行结果
        ctx.cache[pos] = value;
        // 重启流程
        return step();
      });
    } finally {
      // 每次执行完，释放对上下文的掌控
      context = cachedContext;
    }
  }
};
