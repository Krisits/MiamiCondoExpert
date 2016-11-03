'use strict';

const Schema     = use( 'Schema' );
const User       = use( 'App/Model/User' );
const UserFriend = use( 'App/Model/UserFriend' );

class UserFriendsTableSchema extends Schema {

	up() {
		this.createIfNotExists( UserFriend.table, ( table ) => {
			table.increments();
			table.integer( 'user_id' ).notNullable().unsigned().references( 'id' ).inTable( User.table );
			table.integer( 'friend_id' ).notNullable().unsigned().references( 'id' ).inTable( User.table );
			table.boolean( 'confirmed' ).defaultTo( false );
			table.primary( [ 'user_id', 'friend_id' ] );
		} );
		this.raw( `ALTER TABLE ${UserFriend.table} ADD CONSTRAINT ${UserFriend.table + '_check'} CHECK ( user_id <> friend_id ) ;` );
	}

	down() {
		this.dropTableIfExists( UserFriend.table );
	}

}

module.exports = UserFriendsTableSchema;
