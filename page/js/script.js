/* Author:

*/

$(document).ready(function(){
	var morse = new Morse();
	var input_element = $('#input');
	var result_element = $('#result');

	morse.setMorseKey(32);
	morse.input_handler = function(input){ 
		input_element.text(input_element.text() + input); 
	};

	morse.letter_handler = function(input){ 
		if(!input) return;
		input_element.text("");
		result_element.append(morse.out(true)); 
	};

	morse.word_handler = function(input){ 
		result_element.append(' '); 
	};

	var handler = morse.getHandler();
	$('#input').keydown(handler.on).keyup(handler.off);
});




