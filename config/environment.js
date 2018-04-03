'use strict';

module.exports = function(environment) {
	let ENV = {
		modulePrefix: 'front-ssi',
		environment,
		rootURL: '/',
		locationType: 'auto',
		SERVER_API:"http://192.168.10.134:5000",
		EmberENV: {
			FEATURES: {
				// Here you can enable experimental features on an ember canary build
				// e.g. 'with-controller': true
			},
			'simple-auth':{
				store: 'simple-auth-session-store:local-storage',
				authorizer: 'authorizer:token',
				crossOriginWhitelist: "http://192.168.10.134:5000",
				routeAfterAuthentication: '/protected',
				authenticationRoute:'/protected'
			},
			EXTEND_PROTOTYPES: {
				// Prevent Ember Data from overriding Date.parse.
				Date: false
			}
		},

		APP: {
		  // Here you can pass flags/options to your application instance
		  // when it is created
			usingCors: true,
			corsWithCreds: true,
			crossDomain:	true,
			apiURL: "http://192.168.10.134:5000"
		}

	};

	ENV['ember-simple-auth-token'] = {
	  serverTokenEndpoint: ENV.SERVER_API + "/api/auth",
	  identificationField: 'username',
	  passwordField: 'password',
	  tokenPropertyName: 'token',
	  refreshTokenPropertyName: 'refresh_token',
	  authorizationPrefix: 'Bearer ',
	  authorizationHeaderName: 'Authorization',
	  headers: {},
	};
	if (environment === 'development') {
		// ENV.APP.LOG_RESOLVER = true;
		// ENV.APP.LOG_ACTIVE_GENERATION = true;
		// ENV.APP.LOG_TRANSITIONS = true;
		// ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
		// ENV.APP.LOG_VIEW_LOOKUPS = true;
	}

	if (environment === 'test') {
		// Testem prefers this...
		ENV.locationType = 'none';

		// keep test console output quieter
		ENV.APP.LOG_ACTIVE_GENERATION = false;
		ENV.APP.LOG_VIEW_LOOKUPS = false;

		ENV.APP.rootElement = '#ember-testing';
		ENV.APP.autoboot = false;
	}

	if (environment === 'production') {
		// here you can enable a production-specific feature
	}

	return ENV;
};
