/* Author:

*/

$(document).ready(function(){
	var morse = new Morse(150);
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

	make_code_table(Morse.table);
});

function make_code_table(code_list) {
	var template = $('.template').clone().removeClass('template').removeClass('invisible');
	var table = $('#code-table tbody');

	$('.template').remove();

	var j = 1;
	var max_row = 9;
	var append = function(record) {
		if(table.find('tr').length < j) {
			table.append(record);
		} else {
			table.find('tr:nth-child('+j+')').append(record.find('td'));
		}
	}
	for(i in code_list) {
		var record = template.clone();
		record.find('.letter').text(code_list[i]);
		record.find('.code').text(i);

		if(j < max_row) {
			append(record);
			j++;
		} else {
			var tr = $('#code-table thead tr');
			var letter_head = tr.find('.letter:first').clone();
			var code_head = tr.find('.code:first').clone();
			tr.append(letter_head).append(code_head);
			append(record);
			j=1;
		}
	}

	for(; j <= max_row; j++) {
		var record = template.clone();
		table.find('tr:nth-child('+j+')').append(record.find('td'));
	}
}




