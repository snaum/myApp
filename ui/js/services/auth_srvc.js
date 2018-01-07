(function () {'use strict';}());

(function () {
  module.exports = function() {
    this.watchLoginChange = function () {
      var _self = this;
   	  FB.Event.subscribe('auth.authResponseChange', function(res) {
   	  	if (res.status === 'connected') {
			/* 
			The user is already logged, 
			is possible retrieve his personal info
			*/
			_self.getUserInfo();

			/*
			This is also the point where you should create a 
			session for the current user.
			For this purpose you can use the data inside the 
			res.authResponse object.
			*/

   	  	}
   	  	else{
			/*
			The user is not logged to the app, or into Facebook:
			destroy the session on the server.
			*/
   	  	}
   	  });
    };


    this.getUserInfo = function () {
		var _self = this;
		FB.api('/me', function(res) {
			_self.user = res;
			return res;
		});
    };

	this.logout = function() {
		var _self = this;
		FB.logout(function(response) {
			_self.user = {};
			return {};
		});

	};
	return this;
  };
}());