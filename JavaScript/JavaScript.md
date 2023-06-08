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
