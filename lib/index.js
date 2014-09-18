/**
*
*	COMPUTE: erfinv
*
*
*	DESCRIPTION:
*		- Inverse error function.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// ERFINV //

	/**
	* FUNCTION: erfinv( x )
	*	Evaluates the inverse error function for an input value.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated inverse error function
	*/
	function erfinv( x ) {
		if ( typeof x !== 'number' ) {
			throw new TypeError( 'erfinv()::invalid input argument. Must provide a numeric value.' );
		}
	} // end FUNCTION erfinv()


	// EXPORTS //

	module.exports = function( x ) {
		if ( typeof x === 'number' ) {
			return erfinv( x );
		}
		if ( !Array.isArray( x ) ) {
			throw new TypeError( 'erfinv()::invalid input argument. Must provide an array.' );
		}
		var len = x.length,
			arr = new Array( len );

		for ( var i = 0; i < len; i++ ) {
			arr[ i ] = erfinv( x[ i ] );
		}
		return arr;
	};

})();