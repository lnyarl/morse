$(document).ready(function(){
	var morse = new Morse();
	var result = $('#result');
	var letter_out = $('#letter');
	var morse_out = $('#morse');
	var error_out = $('#error');
	
	morse.input_handler = function(input){ morse_out.text(morse_out.text() + input); }
	morse.letter_handler = function(input){ letter_out.text(letter_out.text() + Morse.get(input)); }
	morse.word_handler = function(word){  result.text(morse.out()); }
	morse.error_handler = function(e){ error_out.html(e); }
	var handler = morse.getHandler();
	$('#mydiv').keydown(handler.on).keyup(handler.off);
});
