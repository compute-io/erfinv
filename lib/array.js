'use strict';

// MODULES //

var ERFINV = require( './number.js' );


// INVERSE ERROR FUNCTION //

/**
* FUNCTION: erfinv( out, arr )
*	Computes the inverse error function for each array element.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function erfinv( y, x ) {
	var len = x.length,
		i;
	for ( i = 0; i < len; i++ ) {
		if ( typeof x[ i ] === 'number' ) {
			y[ i ] = ERFINV( x[ i ] );
		} else {
			y[ i ] = NaN;
		}
	}
	return y;
} // end FUNCTION erfinv()


// EXPORTS //

module.exports = erfinv;
