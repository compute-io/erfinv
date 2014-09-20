
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erfinv = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-erfinv', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( erfinv ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a numeric value or an array', function test() {
		var values = [
				'5',
				true,
				undefined,
				null,
				{},
				function(){}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				erfinv( value );
			};
		}
	});

	it( 'should throw an error if a data array contains non-numeric values', function test() {
		var values = [
				'5',
				true,
				undefined,
				null,
				[],
				{},
				function(){}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( [ values[i] ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				erfinv( value );
			};
		}
	});

	it( 'should return NaN if provided a NaN', function test() {
		var val = erfinv( NaN );
		assert.isNumber( val );
		assert.ok( val !== val );
	});

	it( 'should throw an error if provided a value not on the interval [-1,1]', function test() {
		var values = [
				-2,
				2
			];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( Error );
			}

			function badValue( value ) {
				return function() {
					erfinv( value );
				};
			}
	});

	it( 'should return positive infinity if provided 1', function test() {
		var inf = Number.POSITIVE_INFINITY,
			val = erfinv( 1 );
		assert.strictEqual( val, inf );
	});

	it( 'should return negative infinity provided -1', function test() {
		var ninf = Number.NEGATIVE_INFINITY,
			val = erfinv( -1 );
		assert.strictEqual( val, ninf );
	});

	it( 'should return 0 if provided 0', function test() {
		assert.strictEqual( erfinv( 0 ), 0 );
	});

	it( 'should return a numeric value if provided a numeric value', function test() {
		assert.isNumber( erfinv( 0.5 ) );
	});

	it( 'should return an array of numbers if provided an array', function test() {
		var values = [
				0.2,
				0.3
			],
			val;

		for ( var i = 0; i < values.length; i++ ) {
			val = erfinv( [ values[ i ] ] );
			assert.isArray( val );
			assert.isNumber( val[ 0 ] );
		}
	});

	it( 'should evaluate the inverse error function', function test() {
		var values, expected, actual;

		values = [
			0.25,
			-0.25,
			0.6,
			-0.6,
			0.8,
			-0.8,
			0.999,
			-0.999,
			0.9999,
			-0.9999,
			9.999999999999999e-1,
			-9.999999999999999e-1
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

		actual = erfinv( values );

		for ( var i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-4 );
		}
	});

});