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
* @returns {Number[]} output array
*/
function erfinv( y, x, clbk ) {
	var len = x.length,
		v, i;
	for ( i = 0; i < len; i++ ) {
		v = clbk( x[ i ], i );
		if ( typeof v === 'number' ) {
			y[ i ] = ERFINV( v );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION erfinv()


// EXPORTS //

module.exports = erfinv;
