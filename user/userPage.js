var postTemplatePart1 = '<div class="postsDiv"> <h5 id="postsTitle">';
var postTemplatePart2 = '<br /> <button id="dislikeButton" onclick="dislikeButtonClicked(this)">dislike</button> <div id="dislikeCounter">';
var postTemplatePart3 = '</div> </div> </h5> <br /> <br />';
var searchWithoutPrefix;

function initUserPage(){
	initParse();
	var searchPrefix = "?id=";
	var currentLocationSearch = location.search;
	var prefixToCheck = currentLocationSearch.substr(0, searchPrefix.length);
	searchWithoutPrefix = currentLocationSearch.substr(searchPrefix.length, currentLocationSearch.length - searchPrefix.length);
	//searchWithoutPrefix is not "var" because declared on top
	if (prefixToCheck == searchPrefix) {
    	document.title = searchWithoutPrefix;
    	document.getElementById("usernameTitle").innerHTML = searchWithoutPrefix;
		startInfoProcess(searchWithoutPrefix);
	} 
	checkIfLoggedIn();
}
function dislikeButtonClicked(buttonObject){
	var clickedTextOfButton = buttonObject.parentElement.innerHTML.split("<")[0];
	addDislikeToPostWithText(clickedTextOfButton);
	/* var postsToSearchFor = Parse.Object.extend("Posts");
	var query = new Parse.Query(postsToSearchFor);
	query.equalTo("postText", clickedTextOfButton);
	query.find({
	  success: function(results){
 	  	addDislikeToPostWithText(results);
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});  */
}
function addDislikeToPostWithText(postText){
	var postsToSearchFor = Parse.Object.extend("Posts");
	var query = new Parse.Query(postsToSearchFor);
	query.equalTo("postText", postText);
	query.find({
	  success: function(results){
 	  	postsToAddDislikesTo(results)
	  },
	  error: function(error) {
	  }
	}); 
}
function postsToAddDislikesTo(postsToDislike){
	for (var i = 0; i < postsToDislike.length; i++) {
		postsToDislike[i].set("dislikes", postsToDislike[i].get("dislikes") + 1);
		postsToDislike[i].save();
	};
	alert("Dislike successful");
}
function startInfoProcess(username){
	initParse();
	var userToSearchFor = Parse.Object.extend("_User");
	var query = new Parse.Query(userToSearchFor);
	query.equalTo("username", username);
	query.find({
	  success: function(results){
 	  	document.getElementById("aboutInfo").innerHTML = results[0].get("about");
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	}); 
	getPosts(username);
}
function getPosts(username) {
    var userToSearchFor = Parse.Object.extend("Posts");
	var query = new Parse.Query(userToSearchFor);
	query.equalTo("username", username);
	query.find({
	  success: function(results){
	  	fillInPosts(results);
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	}); 
}
function fillInPosts(postsArray) {
	 for (var i = postsArray.length - 1; i >= 0; i--) {
		var completedPostHTML = postTemplatePart1 + postsArray[i].get("postText") + postTemplatePart2 + postsArray[i].get("dislikes") + postTemplatePart3;
    	document.getElementById("postsTD").innerHTML = document.getElementById("postsTD").innerHTML + completedPostHTML;   	
	}
}
function checkIfLoggedIn(){
	var User = Parse.User.current();
	if(currentUser.getUsername){
		document.getElementById("logInForm").style.display = "none";
		document.getElementById("userLoggedInTable").style.display = "initial";
		document.getElementById("userLoggedInH3").innerHTML = currentUser.getUsername();
		checkCreatePostButton(currentUser.getUsername());
	}
}
function checkCreatePostButton(usernameToCheck){
	if(searchWithoutPrefix == usernameToCheck){
		document.getElementById("startPostSpan").style.display = "inline";
	}
}
function goToPostScreen(){
	var currentLocation = location.href;
	var currentLocationURLOnly = currentLocation.substring(0, currentLocation.lastIndexOf("/") + 1)
	location.href = currentLocationURLOnly + "post/";
}