var Automata = require('./automata.js').Automata;

/**
 * Morse use Automata. Morse has Morse Code Table. It parsed by Automata.
 * Morse knows that just letter and word.
 * ref : test/testcase.js
 */
var Morse = function(option) {
  this.automata = new Automata();
	this.inputBuffer = "";
  option = option || {};

  this.dot = option.dot || '.';
  this.dash = option.dash || '-';

  this.automata.parse(Morse.table);

  this.decode = function(str){
    var result = "";

    for(var i = 0; i < str.length; i++){
      result += this.input(str[i]);
    }
    result += this.automata.flush();

    return result;
  };

	this.input = function(input) {
		if(this.isLetterSeperator(input)) {
      return this.automata.flush();
    } else if(this.isWordSeperator(input)) {
      return this.automata.flush() + ' ';
    } else {
      this.automata.input(input);
      return '';
		}
	};

	this.isLetterSeperator = function(input) {
		return input == ' ';
	};

	this.isWordSeperator = function(input) {
		return input == '/';
	};

	this.reset = function() {
		this.automata.flush();
	};
};

// ref : http://foldoc.org/Morse+code
Morse.table = {
/* Letters */
  '.-' : 'a',
  '-...' : 'b',
  '-.-.' : 'c',
  '-..' : 'd',
  '.' : 'e',
  '..-.' : 'f',
  '--.' : 'g',
  '....' : 'h',
  '..' : 'i',
  '.---' : 'j',
  '-.-' : 'k',
  '.-..' : 'l',
  '--' : 'm',
  '-.' : 'n',
  '---' : 'o',
  '.--.' : 'p',
  '--.-' : 'q',
  '.-.' : 'r',
  '...' : 's',
  '-' : 't',
  '..-' : 'u',
  '...-' : 'v',
  '.--' : 'w',
  '-..-' : 'x',
  '-.--' : 'y',
  '--..' : 'z',

/* Numbers */
  '.----' : '1',
  '..---' : '2',
  '...--' : '3',
  '....-' : '4',
  '.....' : '5',
  '-....' : '6',
  '--...' : '7',
  '---..' : '8',
  '----.' : '9',
  '-----' : '0'

/*  Punctuation Marks */
/*
  '.-.-.-' : '.',
  '--..--' : ',',
  '..--..' : '?',
  '-....-' : '-',
  '---...' : ':', //it also 'divied by'
  '..--.-' : '_', // before and after the word to be underlined
  '.----.' : '\'',
  '.-..-.' : '"',
  '-.--.' : '(',
  '-.--.-' : ')',
  '-...-' : '=',
  '.-.-.' : '+',
  '-..-.' : '/'
  */
//'.-..-' : '|' // separator(10)

/*
  warning                      .-..-
  error                        ........
  repetition (ii ii)           .. ..
  wait (AS)                    .-...
  interruption (BK)            -...-.-
  understood (VE)              ...-.
  transmission received (R)    .-.
  beginning of message (KA)    -.-.-
  end of message (AR)          .-.-.
  end of transmission (K) (6)  -.-
  end of transmission (KN) (8) -.--.
  closing mark (SK) (9)        ...-.-
  closing station (CL)         -.-..-.
  */
};

exports.Morse = Morse;
exports.MorseCodeTable = Morse.table;
