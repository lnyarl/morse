var Morse = function(duration){
	this.input_buffer = "";
	this.dot = !!duration ? duration : 200;
	this.morse_key = null;
	this.reset_key = null;

	this.isLetterSeperator = function(input) {
		return input == ' ';
	}

	this.isWordSeperator = function(input) {
		return input == '/';
	}

	this.setDotDuration = function(duration) {
		this.dot = duration;
	}

	this.setMorseKey = function(key) {
		this.morse_key = key;
	}

	this.setResetKey = function(key) {
		this.reset_key = key;
	}

	this.reset = function() {
		this.flush();
	}

	this.feed = function(input) {
		if(this.isLetterSeperator(this.input_buffer[this.input_buffer.length-1]) 
			&& this.isWordSeperator(input))
		{
			this.input_buffer = this.input_buffer.substring(0, this.input_buffer.length-1);
			this.input_buffer += '/';
		}
		else
		{
			this.input_buffer += input;
		}
	};

	this.out = function(flush) {
		var input_words = this.getWords(this.input_buffer); 
		var result = "";

			for(i in input_words) {
				var input_letters = this.getLetters(input_words[i]);
				for(j in input_letters) {
					try {
						result += Morse.get(input_letters[j]);
					} catch (e) {
						this.error_handler(e);
					}
				}

				if(i != input_words.length-1) {
					result += ' ';
				}
			}

		if(!!flush) {
			this.flush();
		}

		return !!result ? result : "";
	};

	this.getWords = function(input) {
		var result = new Array();
		var item = Morse.trim(input).split('/');
		for(i in item) {
			if(item[i] == "") continue;
			result.push(item[i]);
		}
		return result;
	}

	this.getLetters = function(input) {
		return Morse.trim(input).split(' ');
	}

	this.getLastLetter = function(input) {
		var letters = this.getLetters(this.getLastWord(input));
		return letters[letters.length - 1];
	}
	this.getLastWord = function(input) {
		var words = this.getWords(input);
		return words[words.length - 1];
	}

	this.flush = function() {
		this.input_buffer = "";
	}

	this.input_handler = function(input){ console.log(input); };
	this.letter_handler = function(input){ };
	this.word_handler = function(input){ };
	this.error_handler = function(e) { console.log(e); }
	this.reset_handler = function() {};

	// there are chaos;
	this.getHandler = function() {
		var start = 0;
		var end = 0;
		var letter_timeout_obj = null;
		var word_timeout_obj = null;
		var this_ = this;
		return {
			on : function(e) {
            var key_code = ('which' in e) ? e.which : e.keyCode;
				if(!!this_.morse_key && key_code != this_.morse_key) {
					return true;
				}

				if(start == 0) {
					start = new Date().getTime();
					clearTimeout(letter_timeout_obj);
					clearTimeout(word_timeout_obj);
				}

				return false;
			},
			off : function(e) {
            	var key_code = ('which' in e) ? e.which : e.keyCode;
				if(!!this_.morse_key && key_code != this_.morse_key) {
					return true;
				}

				var input = null;
				var dot = this_.dot;
				var dash = dot * 3
				var diff = 0;

				end = new Date().getTime();
				diff = end - start;
				if(diff >= 0 && diff <= dot) {
					input = '.';
				} else if(diff > dot && diff <= dash) {
					input = '-';
				}
				else {
					input = '-';
				}
				diff = start = end = 0;

				this_.feed(input);
				this_.input_handler(input);
				clearTimeout(letter_timeout_obj);
				clearTimeout(word_timeout_obj);
				letter_timeout_obj = setTimeout(function() { 
					this_.feed(' '); 
					this_.letter_handler(this_.getLastLetter(this_.input_buffer));
				}, dot*3);
				word_timeout_obj = setTimeout(function() { 
					this_.feed('/'); 
					this_.word_handler(this_.getLastWord(this_.input_buffer));
				}, dot*7);

				return false;
			},
			reset : function(e) {
            	var key_code = ('which' in e) ? e.which : e.keyCode;
				if(!!this_.reset_key && key_code != this_.reset_key) {
					return true;
				}
				this_.reset();
				this_.reset_handler();
			}
		};
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

Morse.get = function(code) {
	var letter = Morse.table[code];
	if(!!letter){ return letter; }
	else { throw "wrong code"; }
}

Morse.suggest = function(code) {
	var result = new Array();
	for(i in Morse.table) {
		if(i.indexOf(code) == 0) {
			result.push(Morse.table[i]);
		}
	}

	return result;
};

Morse.trim = function(str) {
	if(!str) return "";
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};
