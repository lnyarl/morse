/* Author: Yongjae Choi

*/

$(document).ready(function(){
	var default_dot_duration = 150;
	var morse = new Morse(default_dot_duration);
	var input_element = $('#input');
	var buffer_element = $('#input-buffer');
	var result_element = $('#result');
	var table = $('#code-table');
	var cursor = $('#cursor');

	var append = function(l) {
	}

	morse.setMorseKey(32);
	morse.input_handler = function(input){ 
		input_element.css('border', '1px solid #000');
		cursor.before(input); 
		buffer_element.append(input); 
		var suggest = Morse.suggest(buffer_element.text());
		var correct = '';
		try {
			 correct = Morse.get(buffer_element.text());
		}
		catch (e){
		}

		table.find('.selected').removeClass('selected');
		table.find('.correct').removeClass('correct');
		for(i in suggest) {
			table.find('.' + suggest[i]).addClass('selected');
		}

		if(!!correct) {
			table.find('.' + correct).addClass('correct').removeClass('selected');
		}
		return false;
	};

	morse.letter_handler = function(input){ 
		if(!input) return;
		var text = input_element.text();
		text = text.substr(0, text.length - 1);
		input_element.text('');
		//cursor.remove();
		try {
			var letter = Morse.get(input);
			input_element.append(text.substr(0, text.length - input.length ) + letter);
		} catch (e) {
			input_element.css('border', '2px solid #ff0000');
			input_element.append(text.substr(0, text.length - input.length ));
			setTimeout(function(){ input_element.css('border', '1px solid #000'); }, 3000);
		}
		//result_element.append(morse.out(true)); 
		buffer_element.text('');
		input_element.append(cursor);
	};

	morse.word_handler = function(input){ 
		//result_element.append(' '); 
		cursor.before(" ");
		buffer_element.text('');
	};

	var handler = morse.getHandler();
	$(document).keydown(handler.on).keyup(handler.off);

	var blink = blinkCursor(default_dot_duration);

	$(function() {
		$( "#slider" ).slider({
			min:50,
			max:1000,
			value:default_dot_duration,
			step: 10,
			slide: function( event, ui ) {
				$( "#slider-value" ).text( ui.value + " ms" );
			},
			change: function (event, ui) {
				$( "#slider-value" ).text( ui.value + " ms" );
				morse.setDotDuration(ui.value);
				clearInterval(blink);
				blink = blinkCursor(ui.value);
			}
		});
	});
	$( "#slider-value" ).text( default_dot_duration + " ms"  );


	make_code_table(Morse.table);
});

function blinkCursor(dot_duration) {
	return setInterval(function (){
		var cursor = $('#cursor');

		cursor.toggleClass('invisible');
	}, dot_duration);
}

function make_code_table(code_list) {
	var template = $('.template').clone().removeClass('template').removeClass('invisible');
	var table = $('#code-table tbody');

	$('.template').remove();

	var j = 1;
	var max_row = 13;
	var append = function(record) {
		if(table.find('tr').length < j) {
			table.append(record);
		} else {
			table.find('tr:nth-child('+j+')').append(record.find('td'));
		}
	}
	for(i in code_list) {
		var record = template.clone();
		record.find('.letter').text(code_list[i]).addClass(code_list[i]);
		record.find('.code').text(i).addClass(code_list[i]);

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




