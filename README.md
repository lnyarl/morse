# Morse

## Introduction

Morse Machine in Javascript

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
