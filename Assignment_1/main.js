var fs = require("fs");

var sourceFile = "source/source.json";
var destinationTxtFile = "destination/textFiles/destination.txt";
var jsonObj;

fs.exists(sourceFile, function(exists)
{
    if (exists)
    {
        // read file
        fs.readFile(sourceFile, "utf-8", function(err, data)
        {
			if(err)
				console.log("Error while reading file: " + err);
			else
			{
				jsonObj = JSON.parse(data);
			    console.log(jsonObj);

			    // write data into the file
			    fs.exists(destinationTxtFile, function(exists)
				{
					if(exists)
					{
						console.log("\nBefore sort jsonObj: ");
						console.log(jsonObj);
						
						fs.writeFile(destinationTxtFile, " First Name | Last Name | Score\n", function(err)
						{
							if(err)
							{
								 console.log("Error while writing file: " + err);
					    	}

					    	// sorting student record by score
					    	jsonObj.students = jsonObj.students.sort(function(a,b)
					    	{
					    	  return parseFloat(b.score) - parseFloat(a.score) 
					    	});

					    	console.log("\n After sort jsonObj: " );
					    	console.log(jsonObj);

					    	//	appending student record in the file
					    	for (var i = 0; i < jsonObj.students.length; i++) 
					    	{
	                            fs.appendFile(destinationTxtFile,
	                                jsonObj.students[i].id + ' | ' 
	                              + jsonObj.students[i].fName + ' | '
	                              + jsonObj.students[i].lName + ' | '
	                              + jsonObj.students[i].score + '\n', 
	                                function (err)
	                                {
	                              		if (err)
	                              	  	{ 
	                                		console.log('\nError while appending the file ' + err.message);
	                              	  	}
                                    });
                            }

						     console.log("The file was saved");
						});
					}
					else
					{
						console.log("Error: Destination file does not exists" );
					}
			    });	
			}
			
		});
    }
    else
	{
		console.log("Error: Source file does not exists");
	}
});




