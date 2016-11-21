'use strict';

(function ( $ ) {

	const $doc  = $( document );
	const $win  = $( window );
	const $body = $doc.find( 'body' ).first();

	$doc.ready( function () {
		console.log( 'ready' );
	} );

	$win.on( 'load', function () {
		$body.removeClass( 'loading' );
	} );

})( jQuery );
//# sourceMappingURL=main.js.map
