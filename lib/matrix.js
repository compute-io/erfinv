'use strict';

// FUNCTIONS //

var ERFINV = require( './number.js' );


// INVERSE ERROR FUNCTION //

/**
* FUNCTION: erfinv( out, matrix )
*	Evaluates the inverse error function for each matrix element.
*
* @param {Matrix} out - output matrix
* @param {Matrix} matrix - input matrix
* @returns {Matrix} output matrix
*/
function erfinv( y, x ) {
	var len = x.length,
		i;
	if ( y.length !== len ) {
		throw new Error( 'erfinv()::invalid input arguments. Input and output matrices must be the same length.' );
	}
	for ( i = 0; i < len; i++ ) {
		y.data[ i ] = ERFINV( x.data[ i ] );
	}
	return y;
} // end FUNCTION erfinv()


// EXPORTS //

module.exports = erfinv;
