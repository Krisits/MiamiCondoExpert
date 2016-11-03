'use strict';

const Lucid = use( 'Lucid' );

class UserCapability extends Lucid {

	static get table() {
		return 'user_capability_relations';
	}

	user() {
		return this.hasOne( 'App/Model/User' );
	}

	capability() {
		return this.hasOne( 'App/Model/Capability' );
	}

}

module.exports = UserCapability;
