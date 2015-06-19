'use strict';

// MODULES //

var ERFINV = require( './number.js' );


// INVERSE ERROR FUNCTION //

/**
* FUNCTION: erfinv( out, arr, accessor )
*	Computes the inverse error function for each array element using an accessor function.
*
* @param {Array} out - output array
* @param {Array} arr - input array
* @param {Function} accessor - accessor function for accessing array values
* @returns {Number[]|Null} output array or null
*/
function erfinv( y, x, clbk ) {
	var len = x.length,
		i;
	if ( !len ) {
		return null;
	}
	for ( i = 0; i < len; i++ ) {
		y[ i ] = ERFINV( clbk( x[ i ], i ) );
	}
	return y;
} // end FUNCTION erfinv()


// EXPORTS //

module.exports = erfinv;
