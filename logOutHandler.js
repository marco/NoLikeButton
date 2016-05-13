function logOutUser() {
    Parse.User.logOut();
    location.reload();
}