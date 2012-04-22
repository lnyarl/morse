$(document).ready(function(){
	var morse = new Morse();
	var result = $('#result');
	var morse_out = $('#morse');
	
	morse.input_handler = function(input){ morse_out.text(morse_out.text() + input); }
	morse.word_handler = function(){ result.text(result.text() + morse.out(true)); }
	morse.bind($('#mydiv'));
});
