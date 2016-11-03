'use strict';

const Database  = use( 'Database' );
const Validator = use( 'Validator' );
const User      = use( 'App/Model/User' );

class LoginController {

	* login( request, response ) {

		let errors       = [];
		const validation = yield Validator.validateAll( request.all(), {
			email    : 'required|email',
			password : 'required',
		}, {} );

		if ( !validation.fails() ) {
			const email    = request.input( 'email' );
			const password = request.input( 'password' );
			try {
				yield request.auth.attempt( email, password );
				const redirect = request.input( 'redirect' );
				return response.route( redirect || 'home', 302 );
			} catch ( e ) {
				errors.push( e );
			}
		} else {
			errors = validation.messages();
		}
		yield request.withAll().andWith( { errors : errors } ).flash();
		return response.redirect( 'back' );
	}

	* register( request, response ) {

		let errors       = [];
		const validation = yield Validator.validateAll( request.all(), User.rules, {} );

		if ( !validation.fails() ) {
			const username = request.input( 'username' );
			const email    = request.input( 'email' );
			const password = request.input( 'password' );
			try {
				yield User.create( { username, email, password } );
				yield request.auth.attempt( email, password );
				const redirect = request.input( 'redirect' );
				return response.route( redirect || 'login', 302 );
			} catch ( e ) {
				errors.push( e );
			}
		} else {
			errors = validation.messages();
		}
		yield request.withAll().andWith( { errors : errors } ).flash();
		return response.redirect( 'back' );
	}

	* logout( request, response ) {

		yield request.auth.logout();

		const redirect = request.input( 'redirect' );
		return response.route( redirect || 'login', 302 );
	}

}

module.exports = LoginController;
