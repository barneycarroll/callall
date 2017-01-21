const callall = require( './callall' )

function noop(){}

const tests = [
  [
    'Consumes an array of functions',
    () => callall( [ () => {} ] )
  ],
  [
    'Return a function',
    () => typeof callall( [] ) == 'function'
  ],
  [
    '...which returns an array',
    () => Array.isArray( callall( [] )() )
  ],
  [
    '...with a length that matches original input',
    () => callall( [] )().length == 0             &&
          callall( [ noop ] )().length == 1       &&
          callall( [ noop, noop ] )().length == 2
  ],
  [
    'Supplied functions receive context and arguments of the returned function' +
    'whose return value is an array containing the supplied functions\' output',
    () => {
      const [ context, arg1, arg2 ] = [ {}, {}, {} ]

      const output = callall( [ function pass(){
        return [ this, ...arguments ]
      } ] ).call( context, arg1, arg2 )

      return output[ 0 ][ 0 ] === context &&
             output[ 0 ][ 1 ] === arg1    &&
             output[ 0 ][ 2 ] === arg2
    }
  ],
  [
    'Supplied functions\' return values are exposed at corresponding indices in the returned array',
    () => {
      const output = callall( [ () => 1, () => 2, () => 3 ] )()

      return output[ 0 ] === 1
             output[ 1 ] === 2
             output[ 2 ] === 3
    }
  ]
]

let status = 0

tests.map( ( [ description, test ] ) => {
  try {
    if( test() )
      console.log( '✓ ' + description )

    else {
      console.error( '✗ ' + description )

      status = 1
    }
  }
  catch( e ){
    console.error( '✗ ' + description )
    console.trace( '  Unexpected error' )

    status = 1
  }
} )

process.exit( status )
