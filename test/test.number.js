/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	erfinv = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number erfinv', function tests() {

	it( 'should export a function', function test() {
		expect( erfinv ).to.be.a( 'function' );
	});

	it( 'should evaluate the inverse error function', function test() {
		assert.closeTo( erfinv( 0 ), 0, 1e-4 );
		assert.closeTo( erfinv( 0.25 ), 0.2253, 1e-4 );
		assert.closeTo( erfinv( 0.5 ), 0.4769, 1e-4 );
		assert.closeTo( erfinv( 0.75 ), 0.8134, 1e-4 );
		assert.strictEqual( erfinv( 1 ), Infinity );
	});

	it( 'should throw an error if provided a value not on the interval [-1,1]', function test() {
		var values = [
			-2,
			2
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( RangeError );
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

});
