var friends = require("../data/friends.js");

module.exports = function(app) {
	//gets all the friends in JSON format
	app.get("/api/friends", function(req, res) {
	  res.json(friends);
	});

	// Create New People - takes in JSON input
	app.post("/api/new", function(req, res) {
	  var newperson = req.body;
	  newperson.routeName = newperson.name.replace(/\s+/g, "").toLowerCase();

	  //console.log(newperson);
	  //hide the modal pop up
	  //$("#myModal").modal('hide');

	  //when the submit button is clicked to check the best match
	  $("#modalOpen").click(function()
	  {
	  	var difference=0; //total difference
	  	var min_diff; //minimum difference which is for the best match
		var my_inputs=[]; //array that is used to store the inputs for each question in the survey page 
	  	var diffs=[]; //array that is used for storing the total differences 


	  	
	  	//get the inputs from the drop down lists for each question and push them into the my_inputs array
		var in1=parseInt($("#q1").val());
		my_inputs.push(in1);
		var in2=parseInt($("#q2").val());
		my_inputs.push(in2);
		var in3=parseInt($("#q3").val());
		my_inputs.push(in3);
		var in4=parseInt($("#q4").val());
		my_inputs.push(in4);
		var in5=parseInt($("#q5").val());
		my_inputs.push(in5);
		var in6=parseInt($("#q6").val());
		my_inputs.push(in6);
		var in7=parseInt($("#q7").val());
		my_inputs.push(in7);
		var in8=parseInt($("#q8").val());
		my_inputs.push(in8);
		var in9=parseInt($("#q9").val());
		my_inputs.push(in9);
		var in10=parseInt($("#q10").val());
		my_inputs.push(in10);

		//loop through friends
	  	for(var c=0;c<friends.length;c++)
	  	{
	  		//for each friend in the friends array, find the total difference  
	  		for(var d=0;d<my_inputs.length;d++)
	  		{
	  			difference=difference+Math.abs((friends[c]).scores[d]-my_inputs[d]);
	  		}
	  		//push the total difference into the diffs array before resetting the total difference to 0 for the next friend
	  		diffs.push(difference);
	  		difference=0;
	  	}

	  	//set the min difference to be the first element in the diffs array
	  	min_diff=diffs[0];
	  	//loop through the diffs array to find the minimum difference
	  	for(var a=0;a<diffs.length;a++)
	  	{
	  		if(diffs[a]<min_diff)
	  		{
	  			min_diff=diffs[a];
	  		}
	  	}

	  	var min_index;
	  	//loop through the friends array again
	  	for(var c=0;c<friends.length;c++)
	  	{
	  		//find the total difference for each friend
	  		for(var d=0;d<my_inputs.length;d++)
	  		{
	  			difference=difference+Math.abs(friends[c].scores[d]-my_inputs[d]);
	  		}
	  		//if the total difference is equal to the minimum difference then show the modal and display the name and the image for the best match
	  		if(difference===min_diff)
	  		{
	  			//generate a pop up to display the name and the image of the closest match
	  			min_index=c;
	  			$("#myModal").modal("toggle");
	  			$("#matchName").text(friends[c].name);
	  			$("#matchImg").display(friends[c].photo);
	  			break;	  			
	  		}
	  	}	  	

	  });

	  //push the new friend in the friends array
	  res.json(friends[min_index]);
	  friends.push(req.body);
	});
}