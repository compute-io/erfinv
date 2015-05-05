/* global require, describe, it */
'use strict';

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

	it( 'should export a function', function test() {
		expect( erfinv ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a numeric value or an array', function test() {
		var values = [
			'5',
			new Number( 0.5 ),
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

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				erfinv( [1,2,3], value );
			};
		}
	});

	it( 'should throw an error if provided a copy option which is not a boolean primitive', function test() {
		var values = [
			'5',
			5,
			new Boolean( true ),
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				erfinv( [1,2,3], {
					'copy': value
				});
			};
		}
	});

	it( 'should throw an error if provided an accessor option which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				erfinv( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if an input array contains non-numeric values (if not provided an accessor)', function test() {
		var values = [
			'5',
			new Number( 0.5 ),
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

	it( 'should throw an error if an accessed array value is not numeric', function test() {
		var values = [
			'5',
			new Number( 5 ),
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( [ values[i] ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				var arr = [
					{'x': value}
				];
				erfinv( arr, {
					'accessor': getValue
				});
			};
		}
		function getValue( d ) {
			return d.x;
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
		var values, out;

		values = [
			0.2,
			0.3
		];

		out = erfinv( values );
		assert.isArray( out );
		for ( var i = 0; i < values.length; i++ ) {
			assert.isNumber( out[ i ] );
		}
	});

	it( 'should not mutate the input array by default', function test() {
		var values, out;

		values = [
			0.2,
			0.3
		];

		out = erfinv( values );
		assert.ok( out !== values );
	});

	it( 'should mutate an input array if the `copy` option is `false`', function test() {
		var values, out;

		values = [
			0.2,
			0.3
		];

		out = erfinv( values, {
			'copy': false
		});
		assert.ok( out === values );
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

	it( 'should evaluate the inverse error function using an accessor function', function test() {
		var values, expected, actual;

		values = [
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

		actual = erfinv( values, {
			'accessor': getValue
		});

		for ( var i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-4 );
		}
		function getValue( d ) {
			return d[ 1 ];
		}
	});

});
