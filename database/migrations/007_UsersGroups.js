'use strict';

const Schema    = use( 'Schema' );
const User      = use( 'App/Model/User' );
const Group     = use( 'App/Model/Group' );
const UserGroup = use( 'App/Model/UserGroup' );

class UserGroupRelationsTableSchema extends Schema {

	up() {
		this.createIfNotExists( UserGroup.table, ( table ) => {
			table.increments();
			table.integer( 'user_id' ).notNullable().unsigned().references( 'id' ).inTable( User.table );
			table.integer( 'group_id' ).notNullable().unsigned().references( 'id' ).inTable( Group.table );
		} );
	}

	down() {
		this.dropIfExists( UserGroup.table );
	}

}

module.exports = UserGroupRelationsTableSchema;
