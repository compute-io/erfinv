var erfinv = require( './../lib' );

// Simulate some data...
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = ( Math.random() - 0.5 ) * 2;
}

// Evaluate the inverse error function for each datum:
console.log( erfinv( data ) );
// returns [...]