'use strict';

const _               = require( 'lodash' );
const Lucid           = use( 'Lucid' );
const UserCapability  = use( 'App/Model/UserCapability' );
const GroupCapability = use( 'App/Model/GroupCapability' );

class Capability extends Lucid {

	users() {
		return this.belongsToMany( 'App/Model/User', UserCapability.table );
	}

	groups() {
		return this.belongsToMany( 'App/Model/Group', GroupCapability.table );
	}

	is( caps ) {
		if ( !_.isArray( caps ) ) caps = [ caps ];
		return !!_.find( caps, ( cap ) => {
			if ( cap instanceof this.constructor ) return cap === this;
			return cap === this.name;
		} );
	}

	static check( capabilities, caps ) {
		if ( !capabilities || 0 === capabilities.size() ) return false;
		if ( !_.isArray( caps ) ) caps = [ caps ];
		return !!_.find( capabilities, function ( capability ) {
			return capability.is( caps );
		} );
	}

}

module.exports = Capability;
