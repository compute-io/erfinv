/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erf = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor erf', function tests() {

	it( 'should export a function', function test() {
		expect( erf ).to.be.a( 'function' );
	});

	it( 'should evaluate the error function using an accessor', function test() {
		var data, actual, expected, i;

		data = [
			[1,0.25],
			[2,-0.25],
			[3,0.6],
			[4,-0.6],
			[5,0.8],
			[6,-0.8],
			[7,0.999],
			[8,-0.999],
			[9,0.9999],
			[10,-0.9999],
			[11,9.999999999999999e-1],
			[12,-9.999999999999999e-1]
		];

		// Evaluated on Wolfram Alpha and Octave:
		expected = [
			0.225312,
			-0.225312,
			0.595116,
			-0.595116,
			0.906194,
			-0.906194,
			2.32675,
			-2.32675,
			2.75106,
			-2.75106,
			5.8636, // Octave
			-5.8636 // Octave
		];

		actual = new Array( data.length );
		actual = erf( actual, data, getValue );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-4 );
		}
		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( erf( [], [], getValue ) );
		function getValue( d ) {
			return d.x;
		}
	});

});
