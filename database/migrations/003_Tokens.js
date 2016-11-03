'use strict';

const Schema = use( 'Schema' );
const Token  = use( 'App/Model/Token' );
const User   = use( 'App/Model/User' );

class TokensTableSchema extends Schema {

	up() {
		this.createIfNotExists( Token.table, table => {
			table.increments();
			table.integer( 'user_id' ).unsigned().references( 'id' ).inTable( User.table );
			table.string( 'token', 40 ).notNullable().unique();
			table.boolean( 'forever' ).defaultTo( false );
			table.boolean( 'is_revoked' ).defaultTo( false );
			table.timestamp( 'expiry' );
			table.timestamps();
		} )
	}

	down() {
		this.dropTableIfExists( Token.table );
	}

}

module.exports = TokensTableSchema;
