# Morse

## Introduction

자바스크립트로 만든 모스부호 입력기

<img src="http://distilleryimage6.instagram.com/709333a28c9311e1be6a12313820455d_7.jpg" width="300" height="300" />
<br />(내가 그렸다.)

## Quick start

이 코드는 'sample1.js'와 'sample1.html'의 코드이다. 아래는 html파일의 내용이다.

	<html>
		<head>
			<title>sample1</title>
			<script type="text/javascript" src="../lib/jquery.js" ></script>
			<script type="text/javascript" src="../lib/morse.js" ></script>
			<script type="text/javascript" src="./sample1.js" ></script>
		</head>
		<body>
			see console<br />
			<textarea id="input"></textarea>
		</body>
	</html>

그리고 자바스크립트는 다음과 같다.

	$(document).ready(function(){
		var morse = new Morse();
		
		morse.bind($('#input'));
	});

이제 html파일을 열어 textarea를 클릭해 포커스를 주고 아무키나 눌러보자. 길게도 누르고 있다가 떼도 되고 짧게 누르고 있다가 떼도 된다. 콘솔창을 보면 자신이 누른 것이 출력되는 것을 볼 수 있다. 만약 'dot'의 길이를 바꾸고 싶다면 생성자에 ms단위의 시간을 인자로 넘기면 된다.

	var morse = new Morse(300);	// 이제 'dot'은 300ms이다

0 ms에서 300 ms 사이의 입력은 'dot'으로 인식하고 300 ms에서 900 ms('dot'의 3배 길이)에 들어오는 입력은 'dash'로 인식한다.

## API

### contructor

#### **Morse()**

기본 생성자. 'dot'은 200 ms 이다.

사용법:

	var morse = new Morse();

#### **Morse(duration)**

'dot'의 길이를 인자로 받는 생성자.

사용법:

	var morse = new Morse(100);	// dot duration is 100ms

### callback

* **input_handler(input)** : 사용자가 'dot'이나 'dash'를 입력 했을 때 호출된다.
* **letter_handler(input)** : 사용자가 한 글자를 입력했을 때 호출된다. 한 글자는 'dot'과 'dash'를 조합하여 완성한다.
* **word_handler(input)** : 사용자가 한 단어를 입력 했을 때 호출된다. 'dot'의 7배의 시간동안 입력이 없으면 한 단어가 입력된 것으로 인식한다.
* **error_handler(e)** : `out()`메서드에서 적합하지 않은 코드를 인식했을 때 호출된다.

### method

#### **feed(input)**

사용법:

	var morse = new Morse();
	
	morse.feed('.');
	morse.feed('-');
	assert(morse.out(true) == 'a');

	morse.feed('.');
	morse.feed('-');
	morse.feed(' ');
	morse.feed('.');
	morse.feed('-');
	assert(morse.out(ture) == 'aa');

	morse.feed('.');
	morse.feed('-');
	morse.feed(' ');
	morse.feed('.');
	morse.feed('-');
	morse.feed('/');
	morse.feed('.');
	morse.feed('-');
	assert(morse.out(true) == 'aa a');
	
#### **out(flush)**

사용법:
	var morse = new Morse();
	
	morse.feed('.');
	morse.feed('-');
	assert(morse.out() == 'a');
	morse.feed(' ');
	morse.feed('.');
	morse.feed('-');
	assert(morse.out() == 'aa');
	
	assert(morse.out(true) == 'aa');
	
	morse.feed('.');
	morse.feed('-');
	assert(morse.out() == 'a');

### static method

#### Morse.get(code)

사용법:
	assert(Morse.get('.-') == 'a');
	assert(Morse.get('--.-') == 'q');
	Morse.get('............') // error

#### Morse.suggest(code)

테스트되지 않았다. 사용하지 말길 바란다.

## To do

* Jquery 걷어내기 : DOM 선택과 trim에서만 사용한다.
* textarea에서 사용자가 타이핑하는 값을 출력하지 않기 : 보기에 지저분하다.
* 한글, 기호, 숫자 지원

## Reference

* [wikipedia - morse code(en)](http://en.wikipedia.org/wiki/Morse_code)
* [wikipedia - morse code(ko)](http://ko.wikipedia.org/wiki/%EB%AA%A8%EC%8A%A4_%EB%B6%80%ED%98%B8)
