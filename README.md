# 一部分代码片段收集和个人代码经验总结。

## 1.JS事件循环机制
![JS事件循环机制](https://github.com/Hoson09/code_fragments_gathered/blob/master/img/事件循环机制.jpg?raw=true)

> JS事件循环机制：(暂时的理解)
1. 一个js代码运行的时候，先执行同步代码(console.log(),for循环，new Promise(),等等...),
2. 然后解析到微任务代码段(Promise.then(),Preocess.nextTick(),等等...)的时候就把这个代码段放到微任务队列中,
3. 然后遇到宏任务代码段(setTimeout(),ajax(),点击事件,等等...)的时候就把这个代码段放到宏任务队列中,
4. 然后在js脚本执行完所有同步代码,然后立即执行微任务队列中的代码块,执行完微任务队列中的代码块后(必须清空微任务代码队列才可以继续向下进行)，执行宏任务队列中的代码段。
5. 如果在宏任务代码段中再遇到微任务代码段，会把这个宏任务代码段中的微任务js代码段继续加到微任务队列中，然后执行完这个宏任务代码段中的代码之后，再次执行微任务队列中的微任务代码段直到清空微任务队列后，再向下执行宏任务队列中的宏任务代码段，直到执行完所有的宏任务代码段，整个js任务执行完毕。
> 注意:在new Promise()同步代码中必须执行resolve();这段代码才能对Promise().then()事件进行注册微任务。