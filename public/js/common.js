"use strict";
(function ( $ ) {
	const $doc    = $( document );
	const $slider = $( '.js-latest-deal-slider' );

	$doc.ready( function () {
		$slider.wrap( '<div class="latest-deal-slider" />' );
		$slider.width( function () {
			return $( this )
				.find( '> *' ).length * 270 - 36;
		} );

	} );

	$doc.on( 'click', '.latest-deal-slider-prev', function ( event ) {
		event.preventDefault();
	} );

	$doc.on( 'click', '.latest-deal-slider-next', function ( event ) {
		event.preventDefault();
	} );

})( jQuery );
'use strict';

(function ( $ ) {

})( jQuery );
//# sourceMappingURL=common.js.map
