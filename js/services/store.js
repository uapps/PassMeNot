angular.module('PassMeNot.services.store', [])

  .factory('Store', function() {
	  return {
		  get: function(name) {
			  return JSON.parse(atob(localStorage[name]))
		  },
		  set: function(name, value) {
			  if (value) localStorage[name] = btoa(JSON.stringify(value))
		  },
		  has: function(name) {
			  return !!localStorage[name]
		  },
		  empty: function(name) {
              delete localStorage[name]
		  },
		  valid: function(name, value) {
			  var valid
			  try {
				  if (value) valid = JSON.parse(atob(value))
				  else valid = JSON.parse(atob(localStorage[name]))
			  } catch(err) {
				  valid = false
			  }
			  return valid
		  }
	  }
  })