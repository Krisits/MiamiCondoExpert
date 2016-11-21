'use strict';

const Database = use( 'Database' );

class MainController {

	* home( request, response )
	{
		const featureds = [
			{
				link: '#',
			},
			{
				link: '#',
			},
			{
				link: '#',
			},
			{
				link: '#',
			},
			{
				link: '#',
			},
			{
				link: '#',
			}
		];
		const latests = [
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
			{},
		];
		return yield response.sendView( 'home/home', { featureds, latests } );
	}

	* login( request, response )
	{
		yield request.auth.logout();
		yield response.sendView( 'login', {} );
	}

	* register( request, response )
	{
		yield request.auth.logout();
		yield response.sendView( 'register', {} );
	}

}

module.exports = MainController;
