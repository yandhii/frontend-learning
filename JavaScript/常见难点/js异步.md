# js为什么是单线程的？
最初设计JS是用来在浏览器验证表单操控DOM元素的是一门脚本语言，如果js是多线程的那么两个线程同时对一个DOM元素进行了相互冲突的操作，那么浏览器的解析器是无法执行的。

# js单线程
如果某个任务很耗时，比如涉及很多I/O（输入/输出）操作，那么线程的运行大概是下面的样子。
![image](https://github.com/yandhii/js-learning/assets/65276814/62d1be7b-9c0a-4ec7-934f-1b9a3b32aad0)

上图的绿色部分是程序的运行时间，红色部分是等待时间。可以看到，由于I/O操作很慢，所以这个线程的大部分运行时间都在空等I/O操作的返回结果。这种运行方式称为"同步模式"（synchronous I/O）或"堵塞模式"（blocking I/O）。

如果采用多线程，同时运行多个任务，那很可能就是下面这样。
![image](https://github.com/yandhii/js-learning/assets/65276814/9816d856-30f7-49ec-8acf-7573f95832c3)

其实JavaScript单线程是指浏览器在解释和执行javascript代码时只有一个线程，即JS引擎线程，浏览器自身还会提供其他线程来支持这些异步方法，浏览器的渲染线程大概有一下几种：
> JS引擎线程 事件触发线程 定时触发器线程 异步http请求线程 GUI渲染线程 ...

# 浏览器事件机制
浏览器在执行js代码过程中会维护一个执行栈，每个方法都会进栈执行之后然后出栈。  
与此同时，浏览器又维护了一个消息队列，所有的异步方法，在执行结束后都会将回调方法塞入消息队列中。
当所有执行栈中的任务全部执行完毕后，浏览器开始在event queue寻找任务，先进入event queue的任务先执行。

# js异步机制
## 简介
如果js不存在异步，只能自上而下执行，如果上一行解析时间很长，那么下面的代码就会被阻塞。对于用户而言，阻塞就意味着"卡死"，这样就导致了很差的用户体验。
比如在进行ajax请求的时候如果没有返回数据后面的代码就没办法执行。

js中的异步以及多线程都可以理解成为一种“假象”，就拿h5的WebWorker来说，子线程有诸多限制，不能控制DOM元素、不能修改全局对象 等等，通常只用来做计算做数据处理。
这些限制并没有违背我们之前的观点，所以说是“假象”。JS异步的执行机制其实就是事件循环(eventloop)。
## event loop
> "Event Loop是一个程序结构，用于等待和发送消息和事件。（a programming construct that waits for and dispatches events or messages in a program.）
简单说，就是在程序中设置两个线程：一个负责程序本身的运行，称为"主线程"；另一个负责主线程与其他进程（主要是各种I/O操作）的通信，被称为"Event Loop线程"（可以译为"消息线程"）
![image](https://github.com/yandhii/js-learning/assets/65276814/139ac499-e4aa-4a5f-b919-4229b7c52738)

上图主线程的绿色部分，还是表示运行时间，而橙色部分表示空闲时间。每当遇到I/O的时候，主线程就让Event Loop线程去通知相应的I/O程序，然后接着往后运行，所以不存在红色的等待时间。等到I/O程序完成操作，Event Loop线程再把结果返回主线程。主线程就调用事先设定的回调函数，完成整个任务。
可以看到，由于多出了橙色的空闲时间，所以主线程得以运行更多的任务，这就提高了效率。这种运行方式称为"异步模式"（asynchronous I/O）或"非堵塞模式"（non-blocking mode）。
这正是JavaScript语言的运行方式。单线程模型虽然对JavaScript构成了很大的限制，但也因此使它具备了其他语言不具备的优势。如果部署得好，JavaScript程序是不会出现堵塞的，这就是为什么node.js平台可以用很少的资源，应付大流量访问的原因。

## 运行机制
1. 首先判断JS是同步还是异步，同步就进入主线程运行，异步就进入event table。

2. 异步任务在event table中注册事件，当满足触发条件后（触发条件可能是延时也可能是ajax回调），被推入event queue。

3. 同步任务进入主线程后一直执行，直到主线程空闲时，才会去event queue中查看是否有可执行的异步任务，如果有就推入主线程中。

```js
setTimeout(() => {
  console.log('2秒到了')
}, 2000)
sleep(9999999999)
```
分析运行过程：

console进入Event Table并注册，计时开始。

执行sleep函数，sleep方法虽然是同步任务但sleep方法进行了大量的逻辑运算，耗时超过了2秒。

2秒到了，计时事件timeout完成，console进入Event Queue，但是sleep还没执行完，主线程还被占用，只能等着。

sleep终于执行完了，console终于从Event Queue进入了主线程执行，这个时候已经远远超过了2秒。

其实延迟2秒只是表示2秒后，setTimeout里的函数被会推入event queue，而event queue(事件队列)里的任务，只有在主线程空闲时才会执行。上述的流程走完，我们知道setTimeout这个函数，是经过指定时间后，把要执行的任务(本例中为console)加入到Event Queue中，又因为是单线程任务要一个一个执行，如果前面的任务需要的时间太久，那么只能等着，导致真正的延迟时间远远大于2秒。
我们还经常遇到setTimeout(fn，0)这样的代码，它的含义是，指定某个任务在主线程最早的空闲时间执行，意思就是不用再等多少秒了，只要主线程执行栈内的同步任务全部执行完成，栈为空就马上执行。但是即便主线程为空，0毫秒实际上也是达不到的。根据HTML的标准，最低是4毫秒。
关于setInterval：
以setInterval(fn，ms)为例，setInterval是循环执行的，setInterval会每隔指定的时间将注册的函数置入Event Queue，不是每过ms秒会执行一次fn，而是每过ms秒，会有fn进入Event Queue。需要注意的一点是，一旦setInterval的回调函数fn执行时间超过了延迟时间ms，那么就完全看不出来有时间间隔了。
上面的概念很基础也很容易理解但不幸的消息是上面讲的一切都不是绝对的正确，因为涉及到Promise、async/await、process.nextTick(node)所以要对任务有更精细的定义：

**宏任务（Macrotasks）：**js同步执行的代码块，setTimeout、setInterval、XMLHttprequest、setImmediate、I/O、UI rendering等。

**微任务（Microtasks）：**promise、process.nextTick（node环境）、Object.observe, MutationObserver等。

在划分宏任务、微任务的时候并没有提到async/await因为async/await的本质就是Promise。
事件循环机制到底是怎么样的？
不同类型的任务会进入对应的Event Queue，比如setTimeout和setInterval会进入相同(宏任务)的Event Queue。而Promise和process.nextTick会进入相同(微任务)的Event Queue。
![image](https://github.com/yandhii/js-learning/assets/65276814/83f1fb86-75b4-4d7d-89ef-e9763850b1c0)

1.「宏任务」、「微任务」都是队列，一段代码执行时，会先执行宏任务中的同步代码。

2. 进行第一轮事件循环的时候会把全部的js脚本当成一个宏任务来运行。

3. 如果执行中遇到setTimeout之类宏任务，那么就把这个setTimeout内部的函数推入「宏任务的队列」中，下一轮宏任务执行时调用。

4. 如果执行中遇到 promise.then() 之类的微任务，就会推入到「当前宏任务的微任务队列」中，在本轮宏任务的同步代码都执行完成后，依次执行所有的微任务。

5. 第一轮事件循环中当执行完全部的同步脚本以及微任务队列中的事件，这一轮事件循环就结束了，开始第二轮事件循环。

6. 第二轮事件循环同理先执行同步脚本，遇到其他宏任务代码块继续追加到「宏任务的队列」中，遇到微任务，就会推入到「当前宏任务的微任务队列」中，在本轮宏任务的同步代码执行都完成后，依次执行当前所有的微任务。

7. 开始第三轮，循环往复...

```js
new Promise(function (resolve) { 
    console.log('1')// 宏任务一
    resolve()
}).then(function () {
    console.log('3') // 宏任务一的微任务
})
setTimeout(function () { // 宏任务二
    console.log('4')
    setTimeout(function () { // 宏任务五
        console.log('7')
        new Promise(function (resolve) {
            console.log('8')
            resolve()
        }).then(function () {
            console.log('10')
            setTimeout(function () {  // 宏任务七
                console.log('12')
            })
        })
        console.log('9')
    })
})
setTimeout(function () { // 宏任务三
    console.log('5')
})
setTimeout(function () {  // 宏任务四
    console.log('6')
    setTimeout(function () { // 宏任务六
        console.log('11')
    })
})
console.log('2') // 宏任务一
```
1. 全部代码作为第一个宏任务进入主线程执行。  
2. 首先输出1，同步代码。将then1加入微任务队列。  
3. 下面最外层的三个setTimeout分别是宏任务2，3，4按序排入宏任务队列。  
4. 输出2，同步代码。  
5. 执行微任务then1，输出3.

第1轮事件循环结束，第2轮开始  
1. 宏任务2进入主线程执行
2. 首先输出4，同步代码。
3. setTimeout加入到宏任务队列中，为宏任务五。

第2轮事件循环结束，第3轮开始  
1. 宏任务3进入主线程执行
2. 输出5，同步代码

第3轮事件循环结束，第4轮开始  
1. 输出6，同步代码
2. 将setTimeOut加入到宏队列，为宏任务6

第4轮事件循环结束，第5轮开始  
1. 输出7， 同步代码。
2. 输出8，同步代码。
3. 将then3加入到微任务队列
4. 输出9，同步代码
5. 执行then3，输出10，将setTimeout加入到宏队列，为宏任务7。

第5轮事件循环结束，第6轮开始  
1. 输出11，同步代码。

第6轮事件循环结束，第7轮开始  
1. 输出12，同步代码

输出顺序为1-2-3-4-5-6-7-8-9-10-11-12

**初步总结：宏任务是一个FIFO队列，微任务也是一个FIFO队列。
但是每个宏任务都对应一个微任务队列，宏任务在执行过程中会先执行同步代码再执行微任务队列。**

# async/ await
我们创建了 promise 但不能同步等待它执行完成。
我们只能通过 then 传一个回调函数这样很容易再次陷入 promise 的回调地狱。
实际上，async/await 在底层转换成了 promise 和 then 回调函数。
也就是说，这是 promise 的语法糖。
**每次我们使用 await, 解释器都创建一个 promise 对象，然后把剩下的 async 函数中的操作放到 then 回调函数中。**
async/await 的实现，离不开 Promise。从字面意思来理解，async 是“异步”的简写，而 await 是 async wait 的简写可以认为是等待异步方法执行完成。

## async/await用来干什么？
用来优化 promise 的回调问题，被称作是异步的终极解决方案。

## async/await内部做了什么？
async 函数会返回一个 Promise 对象，如果在函数中 return 一个直接量（普通变量），async 会把这个直接量通过 Promise.resolve() 封装成 Promise 对象。如果你返回了promise那就以你返回的promise为准。
await 是在等待，等待运行的结果也就是返回值。await后面通常是一个异步操作（promise），但是这不代表 await 后面只能跟异步操作 await 后面实际是可以接普通函数调用或者直接量的。

## await的等待机制？
如果 await 后面跟的不是一个 Promise，那 await 后面表达式的运算结果就是它等到的东西；
如果 await 后面跟的是一个 Promise 对象，await 它会“阻塞”后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值作为 await 表达式的运算结果。
但是此“阻塞”非彼“阻塞”这就是 await 必须用在 async 函数中的原因。async 函数调用不会造成“阻塞”，它内部所有的“阻塞”都被封装在一个 Promise 对象中异步执行。（这里的阻塞理解成异步等待更合理）

## async/await在使用过程中有什么规定？
每个 async 方法都返回一个 promise 对象。await 只能出现在 async 函数中。

## async/await 在什么场景使用？
单一的 Promise 链并不能发现 async/await 的优势，但是如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了（Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化它）。

## async/await如何使用？
假设一个业务，分多个步骤完成，每个步骤都是异步的且依赖于上一个步骤的结果。

## **在任务队列中async/await的运行机制**
1. async定义的是一个Promise函数,和普通函数一样只要不调用就不会进入事件队列。  
2. async内部如果没有主动return Promise，那么async会把函数的返回值用Promise包装。  
3. await关键字必须出现在async函数中，await后面不是必须要跟一个异步操作，也可以是一个普通表达式。  
4. 遇到await关键字，await右边的语句会被立即执行然后await下面的代码进入等待状态，等待await得到结果。  
5. await后面如果不是 promise 对象, await会阻塞后面的代码，先执行async外面的同步代码，同步代码执行完，再回到async内部，把这个非promise的东西，作为 await表达式的结果。  
6. await后面如果是 promise 对象，await 也会暂停async后面的代码，先执行async外面的同步代码，等着 Promise 对象 fulfilled，然后把 resolve 的参数作为 await 表达式的运算结果。

```js
setTimeout(function () {
  console.log('8')
}, 0)

async function async1() {
  console.log('1')
  const data = await async2()
  console.log('6')
  return data
}

async function async2() {
  return new Promise(resolve => {
    console.log('2')
    resolve('async2的结果')
  }).then(data => {
    console.log('4')
    return data
  })
}

async1().then(data => {
  console.log('7')
  console.log(data)
})

new Promise(function (resolve) {
  console.log('3')
  resolve()
}).then(function () {
  console.log('5')
})
```
1. 整个script加入宏队列。为宏任务1
2. setTimeou加入宏队列，为宏任务2
3. 执行async1，输出1，阻塞data后面的代码
4. 执行async2，输出2，将then1加入到微任务队列
5. 执行promise同步代码，输出3，将then2加入到微任务队列
6. 执行微任务，输出4，5
7. 输出then后，await拿到了data，返回4
8. 输出6，同步代码
9. 返回4， 

第二轮event loop
1. 输出8
2. 

```js
async function test() {
  console.log('test start');
  await undefined;
  console.log('await 1');
  await new Promise(r => {
    console.log('promise in async');
    r();
  });
  console.log('await 2');
}

test();
new Promise((r) => {
  console.log('promise');
  r();
}).then(() => {
  console.log(1)
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(4)
});
```

1. 首先输出test start
2. await undefined,阻塞下面代码，执行之后的同步代码
3. 执行promise的resolve，输出promise
