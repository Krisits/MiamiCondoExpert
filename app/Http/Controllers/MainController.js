'use strict';

const Database = use( 'Database' );

class MainController {

	* home( request, response ) {
		const user = request.currentUser;
		const caps = yield user.capabilities().fetch();
		console.log( caps );
		return yield response.sendView( 'home', { profile : caps } );
	}

	* login( request, response ) {
		yield request.auth.logout();
		yield response.sendView( 'login', {} );
	}

	* register( request, response ) {
		yield request.auth.logout();
		yield response.sendView( 'register', {} );
	}

}

module.exports = MainController;
