/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erfinv = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset erfinv', function tests() {

	it( 'should export a function', function test() {
		expect( erfinv ).to.be.a( 'function' );
	});

	it( 'should compute the inverse error function and deep set', function test() {
		var data, expected, i;

		data = [
			{'x':0.25},
			{'x':-0.25},
			{'x':0.6},
			{'x':-0.6},
			{'x':0.8},
			{'x':-0.8},
			{'x':0.999},
			{'x':-0.999},
			{'x':0.9999},
			{'x':-0.9999},
			{'x':9.999999999999999e-1},
			{'x':-9.999999999999999e-1}
		];

		data = erfinv( data, 'x' );

		// Evaluated on Wolfram Alpha and Octave:
		expected = [
			{'x':0.225312},
			{'x':-0.225312},
			{'x':0.595116},
			{'x':-0.595116},
			{'x':0.906194},
			{'x':-0.906194},
			{'x':2.32675},
			{'x':-2.32675},
			{'x':2.75106},
			{'x':-2.75106},
			{'x':5.8636}, // Octave
			{'x':-5.8636} // Octave
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x, expected[ i ].x, 1e-4 );
		}

		// Custom separator...
		data = [
			{'x':[9,0.25]},
			{'x':[9,-0.25]},
			{'x':[9,0.6]},
			{'x':[9,-0.6]},
			{'x':[9,0.8]},
			{'x':[9,-0.8]},
			{'x':[9,0.999]},
			{'x':[9,-0.999]},
			{'x':[9,0.9999]},
			{'x':[9,-0.9999]},
			{'x':[9,9.999999999999999e-1]},
			{'x':[9,-9.999999999999999e-1]}
		];

		data = erfinv( data, 'x/1', '/' );
		expected = [
			{'x':[9,0.225312]},
			{'x':[9,-0.225312]},
			{'x':[9,0.595116]},
			{'x':[9,-0.595116]},
			{'x':[9,0.906194]},
			{'x':[9,-0.906194]},
			{'x':[9,2.32675]},
			{'x':[9,-2.32675]},
			{'x':[9,2.75106]},
			{'x':[9,-2.75106]},
			{'x':[9,5.8636]}, // Octave
			{'x':[9,-5.8636]}, // Octave
		];

		for ( i = 0; i < data.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-4, 'custom separator' );
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( erfinv( [], 'x' ), [] );
		assert.deepEqual( erfinv( [], 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = erfinv( data, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
