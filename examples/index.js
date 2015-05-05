'use strict';

var erfinv = require( './../lib' );

var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = ( Math.random() - 0.5 ) * 2;
}
console.log( erfinv( data ) );
// returns [...]
