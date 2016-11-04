'use strict';

const Schema  = use( 'Schema' );
const Profile = use( 'App/Model/Profile' );
const User    = use( 'App/Model/User' );

class ProfilesTableSchema extends Schema {

	up() {
		this.createIfNotExists( Profile.table, ( table ) => {
			table.increments();
			table.integer( 'user_id' ).unsigned().references( 'id' ).inTable( User.table );
			table.string( 'name' );
			table.string( 'surname' );
			table.string( 'phone' );
			table.date( 'date' );
		} )
	}

	down() {
		this.dropIfExists( Profile.table );
	}

}

module.exports = ProfilesTableSchema;
