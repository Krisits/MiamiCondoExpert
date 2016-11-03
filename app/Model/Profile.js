'use strict';

const Lucid  = use( 'Lucid' );
const moment = require( 'moment' );
require( 'moment-precise-range-plugin' );

class Profile extends Lucid {

	user() {
		return this.belongsTo( 'App/Model/User' );
	}

	fullName( surnameFirst = false ) {
		if ( surnameFirst ) {
			return this.surname + ' ' + this.name;
		}
		return this.name + ' ' + this.surname;
	}

	age() {
		if ( !this._$age ) {
			this._$age = this._date()[ 'years' ];
		}
		return this._$age;
	}

	_date() {
		if ( !this._$date ) {
			this._$date = moment.preciseDiff( this.date, new Date(), true );
		}
		return this._$date;
	}

}

module.exports = Profile;
