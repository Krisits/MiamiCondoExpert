'use strict';

const Schema = use( 'Schema' );
const User   = use( 'App/Model/User' );

class UsersTableSchema extends Schema {

	up() {
		this.createIfNotExists( User.table, table => {
			table.increments();
			table.string( 'username', 80 ).notNullable().unique();
			table.string( 'email', 254 ).notNullable().unique();
			table.string( 'password', 60 ).notNullable();
			table.timestamps();
		} );
	}

	down() {
		this.dropIfExists( User.table );
	}

}

module.exports = UsersTableSchema;
