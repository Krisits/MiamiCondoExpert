'use strict';

const Schema     = use( 'Schema' );
const Capability = use( 'App/Model/Capability' );

class CapabilitiesTableSchema extends Schema {

	up() {
		this.createIfNotExists( Capability.table, ( table ) => {
			table.increments();
			table.string( 'name' ).notNullable().unique();
			table.string( 'description' );
		} );
	}

	down() {
		this.dropIfExists( Capability.table );
	}

}

module.exports = CapabilitiesTableSchema;
