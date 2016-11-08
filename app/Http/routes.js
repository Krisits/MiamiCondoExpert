'use strict';

/*
 |--------------------------------------------------------------------------
 | Router
 |--------------------------------------------------------------------------
 |
 | AdonisJs Router helps you in defining urls and their actions. It supports
 | all major HTTP conventions to keep your routes file descriptive and
 | clean.
 |
 | @example
 | Route.get('/user', 'UserController.index')
 | Route.post('/user', 'UserController.store')
 | Route.resource('user', 'UserController')
 */

const Route = use( 'Route' );

Route.group( 'auth', () => {
	Route.post( '/login', 'LoginController.login' );
	Route.get( '/login', 'MainController.login' ).as( 'login' );
	Route.any( '/logout', 'LoginController.logout' ).as( 'logout' );
	Route.post( '/register', 'LoginController.register' );
	Route.get( '/register', 'MainController.register' ).as( 'register' );
} );

Route.on( '/' ).render( 'home/home' ).as( 'home' );


