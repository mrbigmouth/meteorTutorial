window.admin = function() {
  var userId;
  var password;
  if (Meteor.userId()) {
    Router.go('blogAdmin');
  }
  else {
    userId = prompt('?');
    password = prompt('!');
    Meteor.loginWithPassword(userId, password, function(err) {
      if (! err) {
        Router.go('blogAdmin');
      }
    });
  }
};