'use strict';

const Lucid = use( 'Lucid' );

class UserGroup extends Lucid {

	static get table() {
		return 'user_group_relations';
	}

	group() {
		return this.hasOne( 'App/Model/Group' );
	}

	user() {
		return this.hasOne( 'App/Model/User' );
	}

}

module.exports = UserGroup;
