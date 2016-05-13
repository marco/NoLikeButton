function logInFormActivated() {
	
    Parse.User.logIn(document.getElementById("logInUsername").value, document.getElementById("logInPassword").value, {
		success: function(user) {
	    	// Do stuff after successful login.
	    	var currentLocation = location.href;
	    	var currentLocationURLOnly = currentLocation;

	    	currentLocationURLOnly = currentLocation.substring(0, currentLocation.lastIndexOf("/") + 1)

	  //   	if (currentLocation.indexOf("http://") != -1) {
   //  			currentLocationURLOnly = currentLocation.split("http://")[1];
   //  			if(currentLocationURLOnly.indexOf("/") != -1){
   //  				currentLocationURLOnly = currentLocationURLOnly.split("/")[0];
   //  			}
			// }
			// else if(currentLocationURLOnly.indexOf("/") != -1){
   //  			currentLocationURLOnly = currentLocationURLOnly.split("/")[0];
   //  		}
   			if (currentLocationURLOnly.indexOf("/user/") != -1){
   				location.href = currentLocationURLOnly + "?id=" + document.getElementById("logInUsername").value;
   			}
   			else{
   	    		location.href = currentLocationURLOnly + "user/index.html?id=" + document.getElementById("logInUsername").value;
   	    	}
		},
		error: function(user, error) {
			alert("Error: " + error.code + " " + error.message);
		}
	});
}
