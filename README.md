erfinv
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Inverse error function](https://en.wikipedia.org/wiki/Error_function#Inverse_functions). 

The [inverse error function](https://en.wikipedia.org/wiki/Error_function#Inverse_functions) is defined in terms of the [Maclaurin series](http://mathworld.wolfram.com/MaclaurinSeries.html)

<div class="equation" align="center" data-raw-text="
    \operatorname{erf}^{-1}(z)=\sum_{k=0}^\infty\frac{c_k}{2k+1}\left (\frac{\sqrt{\pi}}{2}z\right )^{2k+1}" data-equation="eq:inverse_error_function">
	<img src="https://cdn.rawgit.com/compute-io/erfinv/a7ceaad80daa4f15ee396a7ec360f17c7ee8a5f5/docs/img/eqn.svg" alt="Equation of the inverse error function.">
	<br>
</div>

where `c_0 = 1` and 

<div class="equation" align="center" data-raw-text="
    c_k=\sum_{m=0}^{k-1}\frac{c_m c_{k-1-m}}{(m+1)(2m+1)} = \left\{1,1,\frac{7}{6},\frac{127}{90},\frac{4369}{2520},\frac{34807}{16200},\ldots\right\}" data-equation="eq:inverse_error_function_series_coefficients">
	<img src="https://cdn.rawgit.com/compute-io/erfinv/a7ceaad80daa4f15ee396a7ec360f17c7ee8a5f5/docs/img/eqn2.svg" alt="Equation of the coefficients.">
	<br>
</div>


## Installation

``` bash
$ npm install compute-erfinv
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var erfinv = require( 'compute-erfinv' );
```

#### erfinv( x[, options] )

Evaluates the [inverse error function](https://en.wikipedia.org/wiki/Error_function#Inverse_functions). `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix). All values __must__ reside on the interval `[-1,1]`.

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

out = erfinv( 0.5 );
// returns ~0.47694

out = erfinv( [ 0, 0.2, 0.5, 0.8, 1 ] );
// returns [ 0, 0.17914, 0.47694, 0.90619, +infinity ]

data = [ 0, 0.5, 1 ];
out = erfinv( data );
// returns [ 0, 0.47694, +infinity ]

data = new Float32Array( data );
out = erfinv( data );
// returns Float64Array(  [ 0, 0.47694, +infinity ] )

data = new Float64Array( 4 );
for ( i = 0; i < 4; i++ ) {
	data[ i ] = i / 2;
}
mat = matrix( data, [2,2], 'float64' );
/*
	[  0    0.25
	   0.5  0.75 ]
*/

out = erfinv( mat );
/*
	[  0      ~0.2253
	  ~0.4769 ~0.8134 ]
*/
```

The function accepts the following `options`:

* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	['beep', 0],
	['boop', 0.2],
	['bip', 0.5],
	['bap', 0.8],
	['baz', 1]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = erfinv( data, {
	'accessor': getValue
});
// returns [ 0, 0.17914, 0.47694, 0.90619, +infinity ]
```

To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,0.25]},
	{'x':[2,0.5]},
	{'x':[3,0.75]},
	{'x':[4,1]}
];

var out = erfinv( data, 'x|1', '|' );
/*
	[
		{'x':[0,0]},
		{'x':[1,0.2253]},
		{'x':[2,0.4769]},
		{'x':[3,0.8134]},
		{'x':[4,+infinity]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var data, out;

data = new float64Array( [0, 0.25, 0.5] );

out = erfinv( data, {
	'dtype': 'int32'
});
// returns Int32Array( [0,0,0] )

// Works for plain arrays, as well...
out = erfinv( [0, 0.25, 0.5], {
	'dtype': 'uint8'
});
// returns Uint8Array( [0,0,0] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

var data = [ 0, 0.2, 0.5, 0.8, 1 ];

var out = erfinv( data, {
	'copy': false
});
// returns [ 0, 0.17914, 0.47694, 0.90619, +infinity ]

bool = ( data === out );
// returns true

data = new Float64Array( 4 );
for ( i = 0; i < 4; i++ ) {
	data[ i ] = i / 4;
}
mat = matrix( data, [2,2], 'float64' );
/*
	[  0    0.25
	   0.5  0.75 ]
*/

out = erfinv( mat, {
	'copy': false
});
/*
	[  0      ~0.2253
	  ~0.4769 ~0.8134 ]
*/

bool = ( mat === out );
// returns true
```


## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	erfinv = require( 'compute-erfinv' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = ( Math.random() - 0.5 ) * 2;
}
out = erfinv( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = erfinv( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = erfinv( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = ( Math.random() - 0.5 ) * 2;
}
tmp = erfinv( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = erfinv( mat );

// Matrices (custom output data type)...
out = erfinv( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT)


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-erfinv.svg
[npm-url]: https://npmjs.org/package/compute-erfinv

[travis-image]: http://img.shields.io/travis/compute-io/erfinv/master.svg
[travis-url]: https://travis-ci.org/compute-io/erfinv

[coveralls-image]: https://img.shields.io/coveralls/compute-io/erfinv/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/erfinv?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/erfinv.svg
[dependencies-url]: https://david-dm.org/compute-io/erfinv

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/erfinv.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/erfinv

[github-issues-image]: http://img.shields.io/github/issues/compute-io/erfinv.svg
[github-issues-url]: https://github.com/compute-io/erfinv/issues
