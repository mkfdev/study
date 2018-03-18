# 2회차

1. 과제1: Prototype의 Property 정리
2. 과제2: if/for문 문제풀이
3. 과제3: js_dom, jQuery_dom 살펴보기

---

## 1. 각 Prototype의 Property

### Array.Prototype

+ Array.join() 
    + 배열의 모든 요소를 연결해 하나의 문자열로 만듬
    + *join(seperator)* 각 요소들을 구분할 문자열(seperator)를 지정

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var myFruits = fruits.join(''); // myFruits = BananaOrangeAppleMango
var myFruits = fruits.join(' '); // myFruits = Banana Orange Apple Mango
var myFruits = fruits.join(' and '); // myFruits = Banana and Orange and Apple and Mango
```

---

+ Array.reverse()
    + 배열의 요소를 반전시킨다

``` javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.reverse();
console.log(fruits); 
// frutis = ["Mango", "Apple", "Orange", "Banana"]
```

---

+ Array.sort()
    + 배열의 요소를 정렬
    + 기본적으로 알파벳(문자열) 값을 정렬할 때 사용
+ Array.sort([compareFunction])
    + compareFunction: 정렬 순서를 정의하는 함수를 지정
    + 숫자의 크기를 비교할 때 비교 함수를 정의하여 지정

``` javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.sort();
console.log(fruits);
// fruits = ["Apple", "Banana", "Mango", "Orange"]
```

---

+ Array.concat()
    + 배열 인수를 순서대로 합침
    + 원본 배열은 영향을 받지 않음 (인수로 넘겨진 배열은 주어진 배열들을 합친 후 사본을 반환함)

``` javascript
var num1 = [1, 2, 3],
    num2 = [4, 5, 6],
    num3 = [7, 8, 9],
    num4 = [10, [11, 12]];
var numsArr1 = num1.concat(num2);

num2 = [5, 5, 5]; //참조된 객체가 수정됨 
var numsArr2 = num1.concat(num2, num3);
var numsArr3 = num1.concat(num2, [3, 7]);
var numsArr4 = num1.concat(num1, num4);
console.log(numsArr1);
console.log(numsArr2);
console.log(numsArr3);
console.log(numsArr4);

// numsArr1 = [1, 2, 3, 4, 5, 6];
// numsArr2 = [1, 2, 3, 5, 5, 5, 7, 8, 9];
// numsArr3 = [1, 2, 3, 5, 5, 5, 3, 7];
// numsArr4 = [1, 2, 3, 10, [11, 12]];
```

---

+ Array.slice()
    + 배열에서 요소를 추출함(잘라낸다)
    + slice(start, end) : start 시작 인덱스, end 끝내는 인덱스(포함 안함, end-1번째까지)
    + end가 없을 경우, start이후부터 마지막 인덱스까지 추출함
    + end가 음수값일 경우, 마지막에서부터 추출함(역순 일 때도 end의 index번째는 생략)

``` javascript
var str = "Hello world!"; 
var res = str.slice(0, 5);
console.log(res);
// res = Hello
var res_rev = str.slice(-2);
console.log(res_rev);
// res_rev = d!
```

---

+ Array.push()
    + 배열의 맨 끝에서 요소를 배열 형태로 추가함

``` javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.push("Kiwi", "Lemon", "Pineapple");
console.log(fruits);
// fruits = ["Banana", "Orange", "Apple", "Mango", "Kiwi", "Lemon", "Pineapple"];
```

---

+ Array.pop()
    + 배열의 마지막의 요소를 제거함(꺼냄)

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.pop();
console.log(fruits);
// fruits = ["Banana", "Orange", "Apple"];
```

---

+ Array.shift()
    + 배열의 맨 앞의 요소를 제거함(꺼냄)

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.shift();
console.log(fruits);
// fruits = ["Orange", "Apple", "Mango"];
```

---

+ Array.unshift()
    + 배열의 맨 앞에서 요소를 배열 형태로 추가함
    + push()와 같고, 추가 위치만 다름
    + IE8이하에서 적용안됨

``` javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.push("Kiwi", "Lemon", "Pineapple");
console.log(fruits);
// fruits = ["Kiwi", "Lemon", "Pineapple", "Banana", "Orange", "Apple", "Mango"];
```

---

+ Array.toString()
    + 배열을 문자열로 변환
    + toString(radix): radix 2,8,16진법 숫자로 변환

```javascript
var arr = [1, 2, 'a', '1a'];
console.log(arr.toString());
// arr = "1,2,a,1a"
var num = 15;
var a = num.toString(); // 15
var b = num.toString(2); // 1111
var c = num.toString(8); // 17
var d = num.toString(16); // f
```

---

+ Array.indexOf()
    + 요소의 인덱스를 반환
    + indexOf('찾는요소', number) 
    + number: 같은 요소가 여러개 일 때, 몇 번째 요소인지
    + 찾는 요소가 없을 때 -1 반환

```javascript
var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));// 1
console.log(beasts.indexOf('bison', 2)); // 4
console.log(beasts.indexOf('giraffe'));// -1
```

---

### String.prototype

+ String.replace()
    + 문자열의 특정 부분의 문자를 대체함
    + 매개변수에 정규표현식을 사용함
    + 정규표현식
        + g: 글로벌, 전역 매칭을 뜻함
        + i: case Insensitive, 대소문자 구별안함
        + \d: 숫자, [0-9]와 같음
        + \D: 숫자가 아닌 것들, [^0-9]와 같음

``` javascript
var str = "Mr Blue has a blue house and a blue car";
var res = str.replace(/blue/g, "red"); // 전역의 blue
console.log(res);
// res = Mr Blue has a red house and a red car.

var str = 'Twas the night before Xmas...';
var newstr = str.replace(/xmas/i, 'Christmas'); // xmas 대소문자 구별안함
console.log(newstr);
// newstr = 'Twas the night before Christmas...';
```

---

+ String.slice()
    + 해당 인덱스의 문자열을 잘라냄
    + Array.slice와 매개변수가 같음
    + String.slice(start, end-1) 

``` javascript
    var str = "Hello world!";
    var res = str.slice(1, 4);
    console.log(res);
    // res = ello
```

---

+ String.split()
    + 문자열 분리.문자열을 구분자를 기준으로 잘라냄
    + split("") 문자를 한개씩 쪼갬
    + split(" ") 문자열을 공백을 기준으로 쪼갬

```javascript
var str = "How are you doing today?";
var res = str.split("");
console.log(res);
// res = H,o,w, ,a,r,e, ,y,o,u, ,d,o,i,n,g, ,t,o,d,a,y,?

```

---

+ String.search()
    + 찾는 문자열의 위치 인덱스 값을 반환함

```javascript
var str = "Mr. Blue has a blue house";
var n = str.search(/blue/i); //대소문자 구별없음, 첫번째 Blue가 찾는 문자열이 됨 -> 4

var str = "Mr. Blue has a blue house";
var n = str.search("blue"); //15
```

---

+ String.match()
    + 동일한 단어를 문자열에서 찾음
    + String.match('찾을단어');
    + 해당하는 문자를 찾으면 반환함

``` javascript
var str = "The rain in SPAIN stays mainly in the plain"; 
var res = str.match(/ain/g); // ain,ain,ain
var res = str.match(); // ""
```
---

+ String.trim()
    + 문자열의 공백을 제거함
    + 문자열의 앞뒤 공백만 제거됨

```javascript
var str = "       Hello World!        ";
console.log(str.trim()); // Hello World!
```

---

+ String.indexOf()
    + 특정 문자열의 위치를 인덱스로 반환함
    + Array.indexOf와 같음.
    + indexOf('찾는문자열', number)
    + number: 같은 요소가 여러개 일 때, 몇 번째 요소인지


```javascript
var str = "Hello world, welcome to the universe.";
var n = str.indexOf("welcome"); 
console.log(n); //13
```

---

### Object.Prototype

+ Object.hasOwnProperty()
    + 객체의 고유 프로퍼티 확인
    + Object에 지정된 이름의 속성이 있을 경우 true를 반환함
    + 최상위 Object객체가 가지고 있는 기본적인 메소드.(내장 메소드)

```javascript
var object1 = new Object(); // Object 객체 생성

object1.property1 = 42; //객체의 프로퍼티 생성

console.log(object1.hasOwnProperty('property1')); // true
// property1이라는 프로퍼티는 객체의 고유 프로퍼티로, 해당 메소드를 가지고 있다.

console.log(object1.hasOwnProperty('toString')); //false

console.log(object1.hasOwnProperty('hasOwnProperty')); //false
```

``` javscript
var s = new String("Sample"); // string 객체 생성  

console.log(s.hasOwnProperty("split"));    

console.log(String.prototype.hasOwnProperty("split")); // true  
```


---