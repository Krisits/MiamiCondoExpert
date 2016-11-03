'use strict';

const Lucid = use( 'Lucid' );

class UserFriend extends Lucid {

	static get table() {
		return 'user_friend_relations';
	}

	user() {
		return this.hasOne( 'App/Model/User' );
	}

	friend() {
		return this.hasOne( 'App/Model/User', 'friend_id', 'id' );
	}

}

module.exports = UserFriend;
