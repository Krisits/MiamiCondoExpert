'use strict';

const Lucid          = use( 'Lucid' );
const UserCapability = use( 'App/Model/UserCapability' );
const UserGroup      = use( 'App/Model/UserGroup' );
const Capability     = use( 'App/Model/Capability' );
const Group          = use( 'App/Model/Group' );

class User extends Lucid {

	static boot() {
		super.boot();
		this.addHook( 'beforeCreate', 'encryptingPassword', 'User.encryptPassword' );
		this.addHook( 'afterCreate', 'creatingProfile', 'User.createProfile' );
	}

	static get rules() {
		return {
			username : 'required|unique:users',
			email    : 'required|email|unique:users',
			password : 'required|confirmed',
		};
	}

	static get hidden() {
		return [ 'password' ];
	}

	apiTokens() {
		return this.hasMany( 'App/Model/Token' );
	}

	profile() {
		return this.hasOne( 'App/Model/Profile' );
	}

	capabilities() {
		return this.belongsToMany( 'App/Model/Capability', UserCapability.table );
	}

	groups() {
		return this.belongsToMany( 'App/Model/Group', UserGroup.table );
	}

	* can( caps ) {

		const userCapsCheck = !!Capability.check( yield this.getCapabilities(), caps );
		if ( userCapsCheck ) return true; // return early if found

		return !!Group.check( yield this.getGroups(), caps );
	}

	* getProfile() {
		if ( !this._$profile ) {
			this._$profile = yield this.profile().fetch();
		}
		return this._$profile;
	}

	* getCapabilities() {
		if ( !this._$capabilities ) {
			this._$capabilities = yield this.capabilities().fetch();
		}
		return this._$capabilities;
	}

	* getGroups() {
		if ( !this._$groups ) {
			this._$groups = yield this.groups().fetch();
		}
		return this._$groups;
	}

}

module.exports = User;
