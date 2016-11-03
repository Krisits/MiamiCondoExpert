'use strict';

const Lucid = use( 'Lucid' );

class GroupCapability extends Lucid {

	static get table() {
		return 'group_capability_relations';
	}

	group() {
		return this.hasOne( 'App/Model/Group' );
	}

	capability() {
		return this.hasOne( 'App/Model/Capability' );
	}

}

module.exports = GroupCapability;
