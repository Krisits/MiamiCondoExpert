'use strict';

const _               = require( 'lodash' );
const Lucid           = use( 'Lucid' );
const UserGroup       = use( 'App/Model/UserGroup' );
const GroupCapability = use( 'App/Model/GroupCapability' );
const Capability      = use( 'App/Model/Capability' );

class Group extends Lucid {

	users() {
		return this.belongsToMany( 'App/Model/User', UserGroup.table );
	}

	capabilities() {
		return this.belongsToMany( 'App/Model/Capability', GroupCapability.table );
	}

	* can( caps ) {
		return Capability.check( yield this.capabilities().fetch(), caps );
	}

	static check( groups, caps ) {
		if ( !groups || 0 === groups.size() ) return false;
		return !!_.find( groups, function *( group ) {
			return yield group.can( caps );
		} );
	}

}

module.exports = Group;
