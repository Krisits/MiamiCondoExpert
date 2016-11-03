'use strict';

const Hash = use( 'Hash' );

const User = exports = module.exports = {};

User.encryptPassword = function *( next ) {
	this.password = yield Hash.make( this.password );
	yield next;
};

User.createProfile = function *( next ) {
	yield this.profile().create( { user_id : this.id } );
	yield next;
};