# 库
## crypto-js
### URL: https://cryptojs.gitbook.io/docs/#hashing
### SHA256
input: 输入string或CryptoJS.lib.WordArray实例。当传入string会自动按UTF-8编码为WordArray对象。  
output： 输出WordArray对象，当wordArray在string上下文环境中会自动转为hex string。  
```js
var hash = CryptoJS.SHA256("Message");

typeof hash
> "object";

hash
> "2f77668a9dfbf8d5848b9eeb4a7145ca94c6ed9236e4a773f6dcafa5132b2f91";
```
可以使用toString()或enc(encoder)来显式转换为string/ base64/ hex等格式。  
```js
var hash = CryptoJS.SHA256("Message");

hash.toString(CryptoJS.enc.Base64)
> "L3dmip37+NWEi57rSnFFypTG7ZI25Kdz9tyvpRMrL5E=";

hash.toString(CryptoJS.enc.Hex)
> "2f77668a9dfbf8d5848b9eeb4a7145ca94c6ed9236e4a773f6dcafa5132b2f91";
```
## elliptic
```js
var EC = require('elliptic').ec;

// Create and initialize EC context
// (better do it once and reuse it)
var ec = new EC('secp256k1');

// Generate keys
var key = ec.genKeyPair();

// Sign the message's hash (input must be an array, or a hex-string)
var msgHash = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
var signature = key.sign(msgHash);

// Export DER encoded signature in Array
var derSign = signature.toDER();

// Verify signature
console.log(key.verify(msgHash, derSign));

// CHECK WITH NO PRIVATE KEY

var pubPoint = key.getPublic();
var x = pubPoint.getX();
var y = pubPoint.getY();

// Public Key MUST be either:
// 1) '04' + hex string of x + hex string of y; or
// 2) object with two hex string properties (x and y); or
// 3) object with two buffer properties (x and y)
var pub = pubPoint.encode('hex');                                 // case 1
var pub = { x: x.toString('hex'), y: y.toString('hex') };         // case 2
var pub = { x: x.toBuffer(), y: y.toBuffer() };                   // case 3
var pub = { x: x.toArrayLike(Buffer), y: y.toArrayLike(Buffer) }; // case 3

// Import public key
var key = ec.keyFromPublic(pub, 'hex');

// Signature MUST be either:
// 1) DER-encoded signature as hex-string; or
// 2) DER-encoded signature as buffer; or
// 3) object with two hex-string properties (r and s); or
// 4) object with two buffer properties (r and s)

var signature = '3046022100...'; // case 1
var signature = new Buffer('...'); // case 2
var signature = { r: 'b1fc...', s: '9c42...' }; // case 3

// Verify signature
console.log(key.verify(msgHash, signature));
```
# PoW
注意不能js里把crypto-js库的SHA256值转换为number。这是因为SHA256是256位的，最大值为2^256-1,而js number的最大安全整数值是2^53-1。  
注意一个计算target的算法是2**(256-difficultyBits)，该方法使用difficultyBits是因为从0开始。假如difficulty是4，那么256-difficultyBits为252。而difficultyBits对应的位实际位251,因此这样确保了算法的正确。
