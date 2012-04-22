$(document).ready(function(){
	var morse = new Morse();
	
	var handler = morse.getHandler();
	$('#input').keydown(handler.on).keyup(handler.off);
});
