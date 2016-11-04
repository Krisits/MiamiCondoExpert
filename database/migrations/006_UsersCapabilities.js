'use strict';

const Schema         = use( 'Schema' );
const User           = use( 'App/Model/User' );
const Capability     = use( 'App/Model/Capability' );
const UserCapability = use( 'App/Model/UserCapability' );

class UserCapabilityRelationsTableSchema extends Schema {

	up() {
		this.createIfNotExists( UserCapability.table, ( table ) => {
			table.increments();
			table.integer( 'user_id' ).notNullable().unsigned().references( 'id' ).inTable( User.table );
			table.integer( 'capability_id' ).notNullable().unsigned().references( 'id' ).inTable( Capability.table );
		} );
	}

	down() {
		this.dropIfExists( UserCapability.table );
	}

}

module.exports = UserCapabilityRelationsTableSchema;
