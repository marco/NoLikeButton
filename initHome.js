function initHome () {
	var currentUser = Parse.User.current();
	if(currentUser.getUsername){
		var currentLocation = location.href;
		var currentLocationURLOnly = currentLocation.substring(0, currentLocation.lastIndexOf("/") + 1)
		location.href = currentLocationURLOnly + "/user/?id=" + currentUser.getUsername();
	}
}