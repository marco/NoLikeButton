function postPost() {
	initParse();
	var parseExtendPost = Parse.Object.extend("Posts");
	var post = new parseExtendPost();
	
	if(Parse.User.current()){
		post.set("postText", document.getElementById("postText").value);
		post.set("username", Parse.User.current().getUsername());
		post.set("dislikes", 0);
		post.save(null, {
		  success: function(post){
		  	alert("Done");
		  },
		  error: function(post, error){
		    alert('Failed to create new object, with error code: ' + error.message);
		  }
		});
	}
	else{
		alert("Please log in.")
	}
}