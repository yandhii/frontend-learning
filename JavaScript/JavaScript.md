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
