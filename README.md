# Morse

## Introduction

Morse Machine in Javascript

<img src="http://distilleryimage6.instagram.com/709333a28c9311e1be6a12313820455d_7.jpg" width="300" height="300" />
<br />(I Drew.)

## Quick start
  
It require uglify-js.

  $ npm install -g uglify-js

### For HTML 

  $ make forhtml


  <script src="out/morse.js"></script>
  <script>
    var morse = new Morse();
    console.log(morse.decode('.- -...'));   // This will print 'ab'
  </script>

### For Node

  $ make


  var Morse = require('out/morse.js').Morse;

  var morse = new Morse();
  console.log(morse.decode('.- -...'));   // This will print 'ab'

## Test

  $ node test/testcase.js

## Reference

* [wikipedia - morse code(en)](http://en.wikipedia.org/wiki/Morse_code)
