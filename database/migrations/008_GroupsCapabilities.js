'use strict';

const Schema          = use( 'Schema' );
const Group           = use( 'App/Model/Group' );
const Capability      = use( 'App/Model/Capability' );
const GroupCapability = use( 'App/Model/GroupCapability' );

class GroupCapabilityRelationsTableSchema extends Schema {

	up() {
		this.createIfNotExists( GroupCapability.table, ( table ) => {
			table.increments();
			table.integer( 'group_id' ).notNullable().unsigned().references( 'id' ).inTable( Group.table );
			table.integer( 'capability_id' ).notNullable().unsigned().references( 'id' ).inTable( Capability.table );
		} );
	}

	down() {
		this.dropIfExists( GroupCapability.table );
	}

}

module.exports = GroupCapabilityRelationsTableSchema;
