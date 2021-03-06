
	$('#suggestbox').hide();
		$(document).ready(function() {
			
			let list = [];						// declaring 'list' here so it is global

			// RETRIEVING SUGGESTIONS
			
			$.get('/suggest', function(data) {
				list = data.suggestlist;		// store usernames inside 'list'
			});
			
			//DISPLAYING + CLICKING SUGGESTIONS
			$("#search").keyup(function() {
				
				let suggestions = "";			
				let input = $("#search").val().toLowerCase(); // store and parse the user-input to lowercase

				if(input != "") {
					$('#suggestbox').show();	// only show suggestionbox when there is at least one character

					const match = list.filter(function (element) {
						return element.toLowerCase().includes(input); 	// return IF lowercase version of the element includes input;
					});

					for (i = 0; i < match.length; i++) {
						//give every <li> element the name of the user that is displayed so we can use it later
						suggestions += `<li class="suggest" name="${match[i]}">${match[i]}</li>` 
					};

					$('#suggestcontent').html(`${suggestions}`);	// insert al of the list-items into the <ul> 

				} else {
					$('#suggestbox').hide();	// when input is empty (again, after deleted input) hide suggestionbox 
				}
				
				$(".suggest").on("click", function() {
					$('#suggestbox').hide();
					let click = $(this).attr("name");	// store the value of name attribute (which is full username) in click
					$("#search").val(`${click}`);		// replace it as the new value of the searchbar
				});
			});
		});