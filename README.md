erfinv
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Inverse error function.


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

Evaluates the [inverse error function](http://en.wikipedia.org/wiki/Error_function). The function accepts as its first argument either a single `numeric` value or an `array` of numeric values. A value __must__ reside on the interval `[-1,1]`. For an input `array`, the inverse error function is evaluated for each value.

``` javascript
erfinv( 0.5 );
// returns ~0.47694

erfinv( [ 0, 0.2, 0.5, 0.8, 1 ] );
// returns [ 0, 0.17914, 0.47694, 0.90619, +infinity ]
```

When provided an input `array`, the function accepts two `options`:

*  __copy__: `boolean` indicating whether to return a new `array` containing the `erfinv` values. Default: `true`.
*  __accessor__: accessor `function` for accessing numeric values in object `arrays`.

To mutate the input `array` (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var arr = [ 0, 0.2, 0.5, 0.8, 1 ];

var vals = erfinv( arr, {
	'copy': false
});
// returns [ 0, 0.17914, 0.47694, 0.90619, +infinity ]

console.log( arr === vals );
// returns true
```

For object `arrays`, provide an accessor `function` for accessing `array` values.

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

var vals = erfinv( data, {
	'accessor': getValue
});
// returns [ 0, 0.17914, 0.47694, 0.90619, +infinity ]
```

__Note__: the function returns an `array` with a length equal to the original input `array`.




## Examples

``` javascript
var erfinv = require( 'compute-erfinv' );

var data = new Array( 100 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = ( Math.random() - 0.5 ) * 2;
}

console.log( erfinv( data ) );
// returns [...]
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

Copyright &copy; 2014-2015. Athan Reines.


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
