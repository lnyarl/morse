var assert = require('./test.js').assert;
var Test = require('./test.js').Test;

var statemachineTestCase = {
  test_empty_statamachine : function(){
    var Automata = require('../automata.js').Automata;
    var table = require('../morse.js').MorseCodeTable;
    var m = new Automata();
    m.parse(table);
    assert(m.flush(), '');
  },

  test_statamachine : function(){
    var Automata = require('../automata.js').Automata;
    var table = require('../morse.js').MorseCodeTable;
    var m = new Automata();
    m.parse(table);

    m.input('-');
    assert(m.flush(), 't');
    m.input('.');
    assert(m.flush(), 'e');
    m.input('...');
    assert(m.flush(), 's');
    m.input('-');
    assert(m.flush(), 't');
  }
};

var morseTestCase = {
  test_input : function() {
    var Morse = require('../morse.js').Morse;

    var morse = new Morse();
    morse.input('.');
    morse.input('-');
    var a = morse.input(' ');
    assert('a', a);
  },

  test_input2 : function() {
    var Morse = require('../morse.js').Morse;

    var morse = new Morse();
    var result = '';

    result += morse.input('.');
    result += morse.input('-');
    result += morse.input(' ');
    result += morse.input('-');
    result += morse.input('.');
    result += morse.input('.');
    result += morse.input('.');
    result += morse.input(' ');
    assert('ab', result);
  },

  test_encode : function() {
    var Morse = require('../morse.js').Morse;
    var morse = new Morse();

    assert('ab', morse.decode('.- -...'));
  }
};

Test(statemachineTestCase, 'state machine');
Test(morseTestCase, 'morse machine');
