console.log("WORKING?")

// RETRIEVING USER INFO
$.get('/users', function(data) {
	//push all usernames into one array
	let list = []
	for(let i = 0; i < users.length; i++) { 
	list.push(users[i].firstname + users[i].lastname); 
	console.log(list); 
	}; 
});

// DISPLAYING INFO
$("#search").keyup(function() {
	let value = $("#search").val();
	$.get("/search_result", {input: value}, function(data) {
	$("#output").html(data.output); 
	});
});