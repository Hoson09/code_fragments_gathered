/*JS事件循环机制：
一个js代码运行的时候，
先执行同步代码(console.log(),for循环，new Promise(),等等...),
然后解析到微任务代码段(Promise.then(),Preocess.nextTick(),等等...)的时候
就把这个代码段放到微任务队列中,
然后遇到宏任务代码段(setTimeout(),ajax(),点击事件,等等...)的时候
就把这个代码段放到宏任务队列中,
然后在js脚本执行完所有同步代码,然后立即执行微任务队列中的代码块,
执行完微任务队列中的代码块后执行宏任务队列中的代码段,如果在宏任务代码段中再遇到微任务代码段，
会把这个宏任务代码段中的微任务js代码继续加到微任务队列中，
然后执行完宏任务代码段中的代码之后，再执行宏任务代码段中的微任务代码段*/

/*Preocess.nextTick()优先级高于Promise.then(),
在微任务队列执行的时候,会先执行Preocess.nextTick(),再执行Promise.then() */

/*微任务：微任务通常来说就是需要在当前 task 执行结束后立即执行的任务。 */

/*宏任务：浏览器为了能够使得JS内部task与DOM任务能够有序的执行，会在一个task执行结束后，
在下一个 task 执行开始前，对页面进行重新渲染 （task->渲染->task->...）
鼠标点击会触发一个事件回调，需要执行一个宏任务，然后解析HTML。 */

/*其实JS代码整体的运行过程就可以看成是一个宏任务的执行过程。*/

for (var i = 1; i < 3; i++) {
    console.log(i);
}
setTimeout(() => {
    console.log(3);
    Promise.resolve(2).then(() => {
        console.log(12);
    })
    console.log(13);
}, 4)
console.log(4);
Promise.resolve(1).then(() => {
    console.log(15);
    Promise.resolve(3).then(() => {
        console.log(14);
    })
    console.log(5);
})
console.log(6);
process.nextTick(() => {
    console.log(11);
});
process.nextTick(() => {
    console.log(12);
});
new Promise((resolve, reject) => {
    console.log(7);
    resolve(2);
    console.log(8);
}).then(() => {
    console.log(9);
});
console.log(10);
// 打印顺序如下:
// 1
// 2
// 4
// 6
// 7
// 8
// 10
// 11
// 12
// 15
// 5
// 9
// 14
// 3
// 13
// 12