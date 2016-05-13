var newUsername;
var newEmail;
var newPassword;
var newConfirmPassword;

function signUpFormActivated() {
 	initParse();
 	
 	if (checkIfNoneEmpty(document.getElementById("signUpUsername").value, document.getElementById("signUpEmail").value, document.getElementById("signUpPassword").value, document.getElementById("signUpConfirmPassword").value != "")) {
	    setNewVars();
	}
	else {
    	alert("One or more fields is empty. Please try again.");
    	return;
	}
	if (!checkIfNoSpaces(newUsername)) {
		alert("There cannot be any spaces in your username.")
		return;
	}
	if (!checkIfNoQuestionMarks(newUsername)) {
    	alert("There cannot be any question marks in your username.")
    	return;
	}
	if(checkIfOver5Letters(newUsername)){
		alert("Your username must have at least 5 characters");
	}
 	if (checkIfPasswordsMatch(newPassword, newConfirmPassword)) {
		doSignUp(newUsername, newEmail, newPassword);
 	}
 	else {
    	alert("The passwords do not match. Please try again");
	}
}
function checkIfNoneEmpty(username, email, passwordOne, passwordTwo) {
    if (username != "" && email != "" && passwordOne != "" && passwordTwo != "") {
		return true;
	}
	else {
		return false;
	}
}
function checkIfNoSpaces(username) {
    if (username.indexOf(" ") != -1) {
    	return false;
	}
	else {
    	return true
	}
}
function checkIfNoQuestionMarks(username) {
    if (username.indexOf("?") != -1) {
    	return false;
	}
	else {
    	return true
	}
}
function checkIfPasswordsMatch(passwordOne, passwordTwo) {
    if (passwordOne == passwordTwo) {
    	return true;
	}
	else {
    	return false;
	}
}
function checkIfOver5Letters(username){
	if(username.length >= 5){
		return true;
	}
	else{
		return false;
	}
}
function setNewVars() {
	newUsername = document.getElementById("signUpUsername").value;
	newEmail = document.getElementById("signUpEmail").value;
	newPassword = document.getElementById("signUpPassword").value;
	newConfirmPassword = document.getElementById("signUpConfirmPassword").value;
}
function doSignUp(username, email, password) {
    var user = new Parse.User();
		user.set("username", username.toLowerCase());
		user.set("email", email.toLowerCase());
		user.set("password", password);
		
		user.signUp(null, {
			success: function(user) {
		    	// Hooray! Let them use the app now.
				alert("success");
		  	},
			error: function(user, error) {
		    	// Show the error message somewhere and let the user try again.
		    	alert("Error: " + error.code + " " + error.message);
		  	}
		});
}