/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	erfinv = require( './../lib' ),

	// Error function:
	ERFINV = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-erfinv', function tests() {

	it( 'should export a function', function test() {
		expect( erfinv ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither a number or array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
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

	it( 'should throw an error if provided an invalid option', function test() {
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

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				erfinv( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				erfinv( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should compute the error function when provided a number', function test() {
		assert.strictEqual( erfinv( 0 ), 0 );
		assert.closeTo( erfinv( 0.5 ), 0.4769, 1e-4 );
	});

	it( 'should evaluate the error function when provided a plain array', function test() {
		var data, actual, expected, i;

		data = [
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

		actual = erfinv( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-4 );
		}

		// Mutate...
		actual = erfinv( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-4 );
		}
	});

	it( 'should evaluate the error function when provided a typed array', function test() {
		var data, actual, expected, i;

		data = new Float64Array( [
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
			]);

		expected = new Float64Array( [
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
			5.8636,
			-5.8636
		]);

		actual = erfinv( data );
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-4 );
		}

		// Mutate:
		actual = erfinv( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-4 );
		}
	});

	it( 'should evaluate the inverse error function element-wise and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [
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
		expected = new Int8Array( [ 0, 0, 0, 0, 0, 0, 2, -2, 2, -2, 5, -5 ] );

		actual = erfinv( data, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the error function element-wise using an accessor', function test() {
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

		actual = erfinv( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ], expected[ i ], 1e-4 );
		}

		// Mutate:
		actual = erfinv( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ], expected[ i ], 1e-4 );
		}

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the error function element-wise and deep set', function test() {
		var data, actual, expected, i;

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

		actual = erfinv( data, {
			'path': 'x.1'
		});

		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( data[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-4 );
		}


		// Specify a path with a custom separator...

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
		actual = erfinv( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );

		for ( i = 0; i < actual.length; i++ ) {
			assert.closeTo( actual[ i ].x[ 1 ], expected[ i ].x[ 1 ], 1e-4 );
		}

	});

	it( 'should evaluate the error function element-wise when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float64Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = Math.random();
			d2[ i ] = ERFINV( d1[ i ] );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = erfinv( mat );

		assert.deepEqual( out.data, d2 );

		// Mutate...
		out = erfinv( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d2 );
	});

	it( 'should evaluate the error function element-wise and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Float64Array( 25 );
		d2 = new Float32Array( 25 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = Math.random();
			d2[ i ] = ERFINV( d1[ i ] );
		}
		mat = matrix( d1, [5,5], 'float64' );
		out = erfinv( mat, {
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.deepEqual( out.data, d2 );
	});

	it( 'should return `null` if provided an empty data structure', function test() {
		assert.isNull( erfinv( [] ) );
		assert.isNull( erfinv( matrix( [0,0] ) ) );
		assert.isNull( erfinv( new Int8Array() ) );
	});

});
