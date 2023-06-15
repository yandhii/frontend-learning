# 定义变量
## var
var -> 定义作用域从高到低为global/ function, 没有block作用域。  
在块 {} 内声明的变量可以从块之外进行访问。  
HTML中，通过 var 关键词定义的全局变量属于 window 对象。  
允许在程序的任何位置使用 var 重新声明 用var定义的JavaScript 变量。
通过 var 声明的变量会提升到顶端： 可以在声明变量之前就使用它
## let
let -> 定义作用域为block  
HTML中，通过 let 关键词定义的全局变量不属于 window 对象  
通过 let 定义的变量不会被提升到顶端：在声明 let 变量之前就使用它会导致 ReferenceError。变量从块的开头一直处于“暂时死区”，直到声明为止：
### 重新声明
在相同的作用域，或在相同的块中，通过 let 重新声明一个 var 变量是不允许的。   
```JavaScript
var x = 10;       // 允许
let x = 6;       // 不允许

{
  var x = 10;   // 允许
  let x = 6;   // 不允许
}
```
在相同的作用域，或在相同的块中，通过 let 重新声明一个 let 变量是不允许的。  
```JavaScript
let x = 10;       // 允许
let x = 6;       // 不允许

{
  let x = 10;   // 允许
  let x = 6;   // 不允许
}
```
在相同的作用域，或在相同的块中，通过 var 重新声明一个 let 变量是不允许的。  
```JavaScript
let x = 10;       // 允许
var x = 6;       // 不允许

{
  let x = 10;   // 允许
  var x = 6;   // 不允许
}
```
在不同的作用域或块中，通过 let 重新声明变量是允许的。
```JavaScript
let x = 6;       // 允许

{
  let x = 7;   // 允许
}

{
  let x = 8;   // 允许
}
```
## const
const -> 定义的变量作用域为block  
const 变量必须在声明时赋值
### 不是真正的常数
关键字 const 有一定的误导性。  
它没有定义常量值。它定义了对值的常量引用。  
因此，我们不能更改常量原始值，但我们可以更改常量对象的属性。
**const对象和const数组里的元素而可以被更改，但不能被重新赋值**

# 算数
number和string类型使用+相加会得到字符串
## 运算符优先级

# 变量类型
字符串值，数值，布尔值，数组，对象，undefined。
## undefined： 同时是值和类型，变量类型和默认值为undefined
在 JavaScript 中，没有值的变量，其值是 undefined。typeof 也返回 undefined。  
空值与 undefined 不是一回事。空的字符串变量既有值也有类型。
```JavaScript
let a = "";
let b = undefined;
a == b // false, a的值是"",b的值是undefined; a的类型是string，b的类型是undefined
```
## null 和 undefined
**NUll的值和undefined的值相等，但NULL是object类型，undefined是undefined类型**
```JavaScript
let a = undefined;
let b = null;
a == b // true
a === b // false, NUll的值和undefined的值相等，但NULL是object类型，undefined是undefined类型
```
## **object**
**数组和对象都是object类型**
## 对象
值以名称:值对的方式来书写（名称和值由冒号分隔）: 
```JavaScript 
let person = {"name":"Jack", "age":27};
```
### 对象方法
对象也可以有方法。方法是在对象上执行的动作。方法以函数定义被存储在属性中。
```JavaScript 
var person = {
  firstName: "Bill",
  lastName : "Gates",
  id       : 678,
  fullName : function() {
    return this.firstName + " " + this.lastName;
  }
};
```
Object.freeze(attributeName): 冻结某个属性使其不允许被更改
### this 关键词
在函数定义中，this 引用该函数的“拥有者”。  
在上面的例子中，this 指的是“拥有” fullName 函数的 person 对象。  
换言之，this.firstName 的意思是 this 对象的 firstName 属性。
### 访问属性
1. objectName.propertyName;  
2. objectName["propertyName"];  
### 访问方法
objectName.methodName();
### **不要把字符串、数值和布尔值声明为对象！**
如果通过关键词 "new" 来声明 JavaScript 变量，则该变量会被创建为对象：
```JavaScript
var x = new String();        // 把 x 声明为 String 对象
var y = new Number();        // 把 y 声明为 Number 对象
var z = new Boolean();       //	把 z 声明为 Boolean 对象
```
请避免字符串、数值或逻辑对象。他们会增加代码的复杂性并降低执行速度。

# 字符串
字符串是不可变的：字符串不能更改，只能替换。
## 字符串模板
使用(\`)来定义字符串，可以同时使用单引号和双引号。  
模板字面量允许多行字符串。  
模板字面量提供了一种将变量和表达式插入字符串的简单方法： ```let text = `Welcome ${firstName}, ${lastName}!`;```  
### 标签模板: https://www.zhangxinxu.com/wordpress/2021/12/js-tagged-templates/
```js
// tagged template literals
function tag(strings, ...values){
    console.log(strings);
    console.log(values);
}
let a = 5;
let b = 10;
tag`Hello ${a+b} world ${a*b}`;
```
其中，strings 指的是被 ${...} 这种表达式分隔的字符串。  
...values(exp1, exp2, ...)分别表示第1个 ${...} 占位符中表达式的值，第2个 ${...} 表达式的值。  
上例中string = ['Hello ', ' world ', ''],最后一个字符串表示最后一个${...}后面的字符。values=[a+b, a*b]。    
## 转义字符
添加```\```来转义', ", \  
为了最佳可读性， 程序员们通常会避免每行代码超过 80 个字符串。  
如果某条 JavaScript 语句不适合一整行，那么最佳换行位置是某个运算符之后：  
```JavaScript 
document.getElementById("demo").innerHTML =
"Hello Kitty.";
```
## 方法
### 长度：.length
length 属性返回字符串的长度：```.length```
### 查找字符串中的字符串：
#### 单个查找，返回索引位置：  indexOf() & lastIndexOf()
indexOf() 方法从头到尾进行检索，返回字符串中指定文本**首次**出现的索引（位置）。这意味着：假如第二个参数是 50，则从位置 50 开始检索，直到字符串的终点。  
lastIndexOf() 方法从尾到头进行检索，返回指定文本在字符串中**最后**一次出现的索引。这意味着：假如第二个参数是 50，则从位置 50 开始检索，直到字符串的起点。  
#####
二者的第一个参数为待搜索字符串，第二个参数为起始索引位置。  
如果没找到，二者都返回-1.
#### 
检索字符串中的字符串:  search()  
search() 方法搜索特定值的字符串，并返回匹配的位置
indexOf() 与 search()，是是不相等的。区别在于：  
search() 方法无法设置第二个开始位置参数。  
indexOf() 方法无法设置更强大的搜索值（正则表达式）。 
#### 多个查找
match() 方法根据正则表达式在字符串中搜索匹配项，并将匹配项作为 Array 对象返回。 如果没有\g只返回第一个匹配项。 
```js
string.match(regexp)
```
#### 查找是否包含某个字符串
包含指定值，includes() 方法返回 true。
### 提取部分字符串: slice(start, end), substring(start, end), substr(start, length)
slice(start, end): 和python切片相同， 如果省略第二个参数，则将自动裁剪字符串的剩余部分。
substring(start, end)：和slice()相同，但substring() 无法接受负的索引  
substr(start, length)： 类似于 slice()，不同之处在于第二个参数规定被提取部分的长度。
### 替换字符串内容
replace() 方法用另一个值替换在字符串中指定的值：  ```replace(original, target)```
replace() 方法不会改变调用它的字符串。它返回的是新字符串。
replace() 只替换**首个匹配**且**对大小写敏感**。  
如需执行大小写不敏感的替换，请使用正则表达式 /i（大小写不敏感）：**请注意正则表达式不带引号。**
```js
str = "Please visit Microsoft!";
var n = str.replace(/MICROSOFT/i, "W3School");
```
如需替换所有匹配，请使用正则表达式的 g 标志（用于全局搜索）：
```js
str = "Please visit Microsoft!";
var n = str.replace(/MICROSOFT/g, "W3School");
```
### 大小写转换
toUpperCase() 把字符串转换为大写， toLowerCase() 把字符串转换为大写
### 连接字符串
1. +  
2. concat() 连接两个或多个字符串：  
```js
var text1 = "Hello";
var text2 = "World";
text3 = text1.concat(" ",text2);
```
### 删除两端空白符
```js
var str = "       Hello World!        ";
// 支持 IE 8: alert(str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''));
alert(str.trim());
```
### 判断开头结尾： startsWith() & endWith()
如果字符串以指定值开头，则 startsWith() 方法返回 true，否则返回 false
如果字符串以指定值结尾，则 endsWith() 方法返回 true，否则返回 false

### 提取字符串字符
charAt() 方法: 返回字符串中指定下标（位置）的字符串  
charCodeAt() 方法返回字符串中指定索引的字符 unicode 编码  
属性访问：和py相同，但不建议使用，如果找不到字符，[ ] 返回 undefined，而 charAt() 返回空字符串。
### 字符串转数组
split(): 和py相同
# 函数
## () 运算符调用函数
访问没有 () 的函数将返回函数定义：
```JavaScript
function toCelsius(fahrenheit) {
    return (5/9) * (fahrenheit-32);
}
// return: function toCelsius(fahrenheit) {return (5/9) * (fahrenheit-32);}
document.getElementById("demo").innerHTML = toCelsius;
```
**在非strict模式，如果在函数里不用var/ let/ const定义变量直接赋值，该变量会变为全局变量**
## 函数中的local/ global/ block作用域
var没有block作用域，这意味着在块中重新声明变量也将重新声明块外的变量
```js
// x = 10
var x = 10;
{
    // x = 9
    var x = 9;
}
// x = 9
console.log(x);
```
使用 let 关键字重新声明变量可以解决这个问题。  
在块中重新声明变量不会重新声明块外的变量：**使用let来重新声明变量**
```js
// x = 10
var x = 10;
{
    // x = 9
    let x = 9;
}
// x = 10
console.log(x);
```
let和var在函数(local)和全局(global)声明上相同，不同点在于快作用域里的声明(block)  
如果相同作用域需要重新声明， 使用两个var。  
如果不同作用于需要重新声明，重新声明时使用let  
## IIFE (Immediately Invoked Function Expression): 立刻执行函数
```js
(sayHello = function(name, num) {
    console.log('Hello, ' + name + num + '!');
  })('John',3);
  ```
这个函数没有名称，它被包裹在一个括号对中，这是因为在 JavaScript 中，函数表达式需要被包裹在括号对中才能被当作一个值来处理。紧随其后的第二对括号 () 是用来立即调用这个匿名函数的。
# Object
## 简单创建方法：只限于变量名字是key，变量值是对应的value情况
```js
const simpleFieldFunc = (name, age, gender) => ({name, age, gender});
console.log(simpleFieldFunc("Jack", 'M', 29));
```
## 简写函数
```js
let obj = {
    name:'Jack',
    setName(name){
        this.name = name;
    }
}
```
## 使用class创建
```js
class spaceShuttle{
  constructor(name){
    this.name = name;
    }
}
```

## class 中的getter和setter
```js
class Vegetable{
    constructor(name){
        this._name = name;
    }

    get name(){
        return this._name;
    }

    set name(updatedName){
        this._name = updatedName;
    }
}

const veg = new Vegetable('carrot');
console.log(veg.name);
```
\_name表示为约定的私有变量。  
设置 get name() 之后，name变成了该class的属性。
set之后，可以直接对 obj.name赋值: obj=5
## 方法：
hasOwnProperty(proprtyName): 判断一个obj是否有某个属性
Object.values()： object会被打印为[object Object]， 用该函数可以解决问题。
# Symbol: Symbol类型是symbol
**Symbol表示独一无二的值,Symbol 值不是对象,它是一种类似于字符串的数据类型**
- Symbol是unique的
```js
let s1 = Symbol('s');
let s2 = Symbol('s');
// s1 != s2
console.log(s1 === s2)
```
- Symbol 值作为对象属性名时，不能用点运算符。
```js
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
\\上面代码中，因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个 Symbol 值

同理：在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
let s = Symbol();

let obj = {
  [s]: function (arg) { ... }
};

obj[s](123);
```
相同参数的Symbol函数的返回值是不相等的理由：Symbol函数的参数只是表示对当前 Symbol 值的描述
- 属性名的遍历
Symbol作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，也不会被Object.keys()（返回指定对象的可枚举属性组成的数组）、Object.getOwnPropertyNames()(返回指定对象的所有自身属性组成的数组，包括不可枚举属性)、JSON.stringify()（JSON对象-->JSON字符串）返回。

Object.getOwnPropertySymbols():获取指定对象的所有 Symbol 属性名组成的数组


Reflect.ownKeys():返回所有类型的属性名（包括常规键名和 Symbol 键名）
# 数组: 数组类型也是object
## 方法
Array.isArray(obj): 判断是否是Array类型  
arr1.concat(arr2, arr3) => [arr1,arr2,arr3]: 合并数组
pop():移除最右边元素，返回值  
shift(): 移除最左边元素，return最左边元素值  
push(): 再左右边添加新元素，返回新数组长度
unshift(): 在最左边添加新元素，返回新数组长度
splice(): 第一个参数定义了应添加新元素的位置（拼接）。第二个参数（0）定义应删除多少元素。其余参数（“Lemon”，“Kiwi”）定义要添加的新元素  
slice(): 裁剪数组。该方法会从开始参数选取元素，直到结束参数（不包括）为止。  
## 解构赋值
```js
const obj = {x:3, y:4};
const {x : a, y: b} = obj;
const obj2
```
从obj里提取x和y属性的值
```js
function func(){
    const {tomorrow: tempOfTomorrow} = AVG_TEMPERATURES;
    return tempOfTomorrow;
}
```
从AVG_TEMPERATURES里提取tomorrow对应的值，并赋值给tempOfTomorrow
## 以函数为参数的方法
### filter(filterFunc): 创建一个包含通过测试的数组元素的新数组
### map(mapFunc)：map() 方法通过对每个数组元素执行函数来创建新数组。  
map() 方法不会对没有值的数组元素执行函数。  
map() 方法不会更改原始数组  
### reduce(): 在每个数组元素上运行函数，以生成（减少它）单个值。  
reduce() 方法在数组中从左到右工作。另请参阅 reduceRight()。  
reduce() 方法不会减少原始数组。

## 拷贝
arr2 = [...arr1]是拷贝，arr2=arr1只是拷贝一个对arr1的引用

# JSON
## parse(jsonString): 将JSON string转为object
## stringify(jsonFormatObject): 将json格式object转为string
日期字符串化: 在 JSON 中，不允许日期对象。JSON.stringify() 函数将把任何日期转换为字符串。  
函数字符串化： 在 JSON 中，不允许函数作为对象值。JSON.stringify() 函数将从 JavaScript 对象删除任何函数，包括键和值：
**避免在JSON中使用函数**
# Proxy
Proxy对象就是可以让你去对JavaScript中的一切合法对象的基本操作进行自定义.然后用你自定义的操作去覆盖其对象的基本操作.也就是当一个对象去执行一个基本操作时,其执行的过程和结果是你自定义的,而不是对象的。  
```js
let p = new Proxy(target, handler);
```
其中:  
- target是你要代理的对象.它可以是JavaScript中的任何合法对象.如: (数组, 对象, 函数等等)  
- handler是你要自定义操作方法的一个集合.
- p是一个被代理后的新对象,它拥有target的一切属性和方法.只不过其行为和结果是在handler中自定义的.
```js
let obj = {
    a: 1,
    b: 2,
    c: 'DIY'
}

const p = new Proxy(obj, {
    get(target, key, value){
        if(key === 'C'.toLowerCase()){
            return "DIY";
        }
        else{
            return target[key];
        }
    },

    set(target, key, value){
        if(value == 'DD'){
            target[key] = 'DIYDIY';
        }
        else{
            target[key] = value;
        }
    }
})
// p.c = DIY
console.log(p.c);
// p.d = 'DIYDIY'
p.d = 'DD';
console.log(p.d)
```
## 应用场景
- 属性验证和过滤：使用 Proxy 可以拦截对象的读取和赋值操作，从而实现属性验证和过滤。例如，我们可以使用 Proxy 来确保对象的某个属性只能是特定类型的值：
```javascript
let person = new Proxy({}, {
  set(target, key, value) {
    if (typeof value !== 'string') {
      throw new TypeError('Name must be a string');
    }
    target[key] = value;
  }
});

person.name = 'Alice'; // 正常赋值
person.name = 123; // 报错：Name must be a string
```
- 计算属性：使用 Proxy 可以拦截对象的读取操作，并根据需要动态计算属性的值。例如，我们可以使用 Proxy 来实现一个简单的计算属性：
```javascript
let person = new Proxy({
  firstName: 'Alice',
  lastName: 'Smith'
}, {
  get(target, key) {
    if (key === 'fullName') {
      return `${target.firstName} ${target.lastName}`;
    }
    return target[key];
  }
});

console.log(person.firstName); // 输出 "Alice"
console.log(person.lastName); // 输出 "Smith"
console.log(person.fullName); // 输出 "Alice Smith"
```
- 拦截函数调用：使用 Proxy 可以拦截对象的函数调用操作，并根据需要动态生成函数的返回值。例如，我们可以使用 Proxy 来实现一个简单的延迟计算：
```javascript
let lazy = new Proxy({}, {
  get(target, key) {
    if (typeof target[key] === 'undefined') {
      target[key] = Math.random();
    }
    return target[key];
  }
});

console.log(lazy.foo); // 随机生成一个数值
console.log(lazy.foo); // 返回上次生成的数值
console.log(lazy.bar); // 随机生成一个数值
console.log(lazy.bar); // 返回上次生成的数值
```
- 对象代理：使用 Proxy 可以代理一个对象，并在对象的读取和赋值操作中添加一些额外的逻辑。例如，我们可以使用 Proxy 来实现一个简单的对象缓存：
```javascript
let cache = new Proxy({}, {
  get(target, key) {
    if (typeof target[key] === 'undefined') {
      target[key] = expensiveOperation();
    }
    return target[key];
  }
});

function expensiveOperation() {
  console.log('Performing expensive operation...');
  return Math.random();
}

console.log(cache.foo); // 执行 expensiveOperation，随机生成一个数值
console.log(cache.foo); // 直接返回上次生成的数值
console.log(cache.bar); // 执行 expensiveOperation，随机生成一个数值
console.log(cache.bar); // 直接返回上次生成的数值
```
# 运算符
## 三元运算符： ```a ? b : c ``` = if a return b else return c
多重三元运算符: ```a ? b : c > 5 ? d : e ``` = 
```
if(a){
  return b;
}
else{
  if(c > 5){
    return d;
  }
  else{
    return e;
  }
}
```
# 随机数
## Math.random(): 生成(0,1)区间内的随机浮点数
## Math.floor(Math.random() * 10): 生成[0,10) / [0,9]区间内的随机整数;

## Math.floor(Math.random() * (max - min)) + min: 生成[min,max)区间内的随机整数

Math.random()生成一个(0,1)内的浮点数，乘(max-min)生成一个(0, max-min)之内的浮点数。  
再加min,得到一个(0, max)之内的浮点数。  
取下界，得到一个[0,max) / [0,max-1]之内的整数。  
## Math.floor(Math.random() * (max - min + 1)) + min: 生成[min,max]区间内的随机整数

Math.random()生成一个(0,1)内的浮点数，乘(max-min+1)生成一个(0, max-min+1)之内的浮点数。  
再加min,得到一个(0, max+1)之内的浮点数。  
取下界，得到一个[0,max+1) / [0,max]之内的整数。

# 闭包  
JavaScript 闭包使函数拥有“私有”变量成为可能。  
计数器被这个匿名函数的作用域保护，并且只能使用 increment/ decrement函数来修改。  
闭包指的是有权访问父作用域的函数，即使在父函数关闭之后。
```js
const counter = (function(){
    var privateCounter = 0;
    function changeBy(val){
        privateCounter += val;
    }
    return {
        increment: function(){
            changeBy(1);
        },
        decrement: function(){
            changeBy(-1);
        },
        value: function(){
            return privateCounter;
        }
    }
})();
```
privateCounter和changeBy()是私有的。
# 导入导出
# 异步
同步函数自顶向下按顺序执行，必须等待上一行代码执行完成。  
异步函数不需要等待完成，可以同时执行其他的同步代码。
## callback
```js
// callback
let arr = [1,2,3];
const func1 = (nextFunc) => {
    setTimeout(() => console.log(arr + 'timeout1'), 1000);
    console.log(arr + '0');
    nextFunc();
    console.log(arr + '1');
};

const func2 = () => {
    arr.push(4);
    setTimeout(() => console.log(arr + 'timeout2'), 2000);
};

func1(func2);
```
这段代码执行顺序如下：  
1. 使用setTimeout 函数异步地输出数组 arr + 'timeout1' 的值，并设置延迟时间为 1 秒。继续往下执行。  
2. 打印arr + '0'  
3. 调用func2  
4. 将4使用push方法加入到arr中  
5. 使用setTimeout 函数异步地输出数组 arr + 'timeout2' 的值，并设置延迟时间为 2 秒。继续往下执行。  
6. 打印arr + 'timeout1'  
7. 打印arr + 'timeout2'  
## Promise
- 语法
```js
let createPromise = () => {
    return new Promise((resolve, reject) => {
        const error = false;
        if(!error){
            resolve();
        }
        else{
            reject('Error');
        }
    })
};
```
当生产代码获得结果后，应该调用两个callback函数(resolve, reject)之一:  
| Result | Call |
|--------|--------|
| Success | |myResolve(result value)|
| Error | |myReject(error object)|
